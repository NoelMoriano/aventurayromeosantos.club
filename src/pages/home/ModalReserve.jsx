import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDefaultFirestoreProps, useDevice, useFormUtils } from "../../hooks";
import { common } from "../../config";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
  TextArea,
  TimePicker,
} from "../../components";
import { lighten } from "polished";
import dayjs from "dayjs";
import { CardSelectedTicket } from "./CardSelectedTicket.jsx";
import {
  addReservation,
  fetchReservationByDni,
  getReservationId,
} from "../../firebase/collections/reservations.js";
import { capitalize, isEmpty, omit } from "lodash";

export const ModalReserve = ({
  visibleModalReserve,
  onClickVisibleModalReserve,
  onSetTicketSelected,
  ticketSelected,
}) => {
  const { isMobile } = useDevice();
  const { assignCreateProps } = useDefaultFirestoreProps();

  const bestPriceOffer = (ticketSelected?.reservations || [])
    .filter((reservation) => reservation.priceOffer)
    .reduce((prev, cur) => {
      return +cur.priceOffer < +prev.priceOffer ? prev : cur;
    }, 0);

  const [loadingContact, setLoadingContact] = useState(false);

  const schema = yup.object({
    dni: yup.string().min(8).max(8).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().min(9).max(9).required(),
    dateToMeet: yup.mixed().required(),
    timeToMeet: yup.mixed().required(),
    priceOffer: yup.string().notRequired(),
    message: yup.string(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  const onSubmitReservation = async (formData) => {
    try {
      setLoadingContact(true);

      if (
        formData?.priceOffer &&
        +formData?.priceOffer <=
          (+bestPriceOffer === 0
            ? +ticketSelected.price
            : +bestPriceOffer.priceOffer)
      )
        return notification({
          type: "warning",
          title:
            "No puedes ingresar un precio menor o igual al mejor precio ofertado hasta el momento",
        });

      const reservation = await existsReservation(formData.dni);
      if (!isEmpty(reservation))
        return notification({
          type: "warning",
          title: "Lo siento no puedes volver a usar el mismo DNI",
        });

      await addReservation(assignCreateProps(mapReservationData(formData)));

      notification({ type: "success", title: "Registrado exitosamente" });
      resetReservationData();
      onClickVisibleModalReserve(false);
    } catch (e) {
      console.log("Error email send:", e);
      notification({ type: "error", placement: "topLeft" });
    } finally {
      setLoadingContact(false);
    }
  };

  const mapReservationData = (formData) => ({
    id: getReservationId(),
    dni: formData.dni,
    ticketId: ticketSelected.id,
    ticket: omit(ticketSelected, "reservations"),
    firstName: formData.firstName.toLowerCase(),
    lastName: formData.lastName.toLowerCase(),
    email: formData.email.toLowerCase(),
    phoneNumber: formData.phoneNumber,
    dateToMeet: dayjs(formData.dateToMeet).format("DD/MM/YYYY"),
    timeToMeet: isMobile
      ? formData.timeToMeet
      : dayjs(formData.timeToMeet).format("HH:mm"),
    priceOffer: +formData?.priceOffer || "",
    message: formData?.message || "",
  });

  const resetReservationData = () =>
    reset({
      dni: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateToMeet: undefined,
      timeToMeet: undefined,
      priceOffer: "",
      message: "",
    });

  const userResetFields = (userOfApi) => {
    setValue("firstName", capitalize(userOfApi?.firstName || ""));
    setValue(
      "lastName",
      capitalize(
        userOfApi?.paternalSurname
          ? `${userOfApi?.paternalSurname} ${userOfApi?.maternalSurname}`
          : "",
      ),
    );
  };

  const onFetchPersonDataByDni = async (dni = "") => {
    return await fetch(`${common?.apisNet.apiUrl}/consults/dni/${dni}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": null,
        "content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  useEffect(() => {
    const dniFormData = watch("dni") || "";
    const existsDni = (watch("dni") || "").length === 8;
    if (existsDni) {
      (async () => {
        try {
          const reservation = await existsReservation(dniFormData);
          if (!isEmpty(reservation))
            return notification({
              type: "warning",
              title: "Lo siento no puedes volver a usar el mismo DNI",
            });

          const response = await onFetchPersonDataByDni(dniFormData);
          if (!response.ok) {
            throw new Error(response);
          }

          const userOfApi = await response.json();

          userResetFields(userOfApi);
        } catch (e) {
          console.log("errorGetDni: ", e);
          userResetFields(null);
        }
      })();
    } else {
      userResetFields(null);
    }
  }, [watch("dni")]);

  const existsReservation = async (dni = "") => {
    const reservations = await fetchReservationByDni(dni);
    return reservations?.[0];
  };

  return (
    <ModalComponent
      title={
        <div>
          <h4 style={{ margin: "0", fontSize: "1.1em" }}>
            ¡Agenda tu cita y reserva tu entrada ya!
          </h4>
        </div>
      }
      closable
      closeModal={() => {
        onSetTicketSelected(null);
        return onClickVisibleModalReserve();
      }}
      open={visibleModalReserve}
      onOk={() => onClickVisibleModalReserve()}
      onCancel={() => {
        onSetTicketSelected(null);
        return onClickVisibleModalReserve();
      }}
      footer={null}
    >
      <Form onSubmit={handleSubmit(onSubmitReservation)}>
        <Row gutter={[16, 20]}>
          <Col span={24}>
            <div className="card-ticket-selected">
              <CardSelectedTicket ticket={ticketSelected} />
            </div>
          </Col>
          <Col span={24}>
            <Controller
              name="dni"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  type="number"
                  label="Ingrese numero DNI"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Ingrese nombres"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Ingrese apellidos"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Ingrese email"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <InputNumber
                  label="Ingrese teléfono"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <div style={{ width: "100%", margin: "0 .5em" }}>
            <p className="top-label">
              Fecha y hora para reunirnos por google meet
            </p>
            <Row gutter={[16, 20]}>
              <Col xs={24} sm={24} md={12}>
                <Controller
                  name="dateToMeet"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <DatePicker
                      label="Fecha"
                      size="large"
                      isMobile={isMobile}
                      animation={true}
                      name={name}
                      value={value}
                      onChange={onChange}
                      error={error(name)}
                      required={required(name)}
                      minDate={dayjs()}
                    />
                  )}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Controller
                  name="timeToMeet"
                  control={control}
                  defaultValue={undefined}
                  render={({ field: { onChange, value, name } }) => (
                    <TimePicker
                      label="Hora"
                      size="large"
                      format="HH:mm"
                      isMobile={isMobile}
                      animation={true}
                      name={name}
                      value={value}
                      onChange={onChange}
                      error={error(name)}
                      required={required(name)}
                    />
                  )}
                />
              </Col>
            </Row>
          </div>
          <Col span={24}>
            <div>
              <p className="top-label">
                Este campo no es obligatorio, pero se le dara mayor prioridad a
                el mejor postor
              </p>
              <div className="best-price">
                <div>Este es el mejor precio ofertado hasta el momento:</div>
                <div>
                  S/{" "}
                  {+bestPriceOffer === 0
                    ? ticketSelected?.price
                    : bestPriceOffer.priceOffer}
                </div>
              </div>
              <Controller
                name="priceOffer"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputNumber
                    label="Mejorar precio para la entrada"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </div>
          </Col>
          <Col span={24}>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <TextArea
                  label="¿Algun mensaje?"
                  rows={4}
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              width="100%"
              margin="0"
              block
              size="large"
              htmlType="submit"
              loading={loadingContact}
              className="btn-send-reserve"
            >
              Enviar
            </Button>
          </Col>
        </Row>
      </Form>
    </ModalComponent>
  );
};

const ModalComponent = styled(Modal)`
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
  top: 0;
  z-index: 9999999 !important;

  ${mediaQuery.minTablet} {
    min-width: inherit;
    min-height: inherit;
    width: inherit;
    height: auto;
    top: 2vh;
  }

  .best-price {
    width: 100%;
    background: rgb(241 189 31 / 16%);
    border: 1.5px solid #f0b811;
    padding: 0.2em 1em;
    border-radius: 0.6em;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 0.5em;
    div:last-child {
      font-size: 1.1em;
      font-weight: 600;
      color: red;
    }
  }

  .sub-title {
    width: 100%;
    text-align: center;
    padding-bottom: 0.3em;
  }

  .ant-modal-content {
    border-radius: 1.2em;
    background-color: ${({ theme }) => lighten(0.09, "#eee")};
    color: ${({ theme }) => theme.colors.font2};

    .ant-modal-header {
      background-color: inherit;

      .ant-modal-title {
        text-align: center;
        color: ${({ theme }) => theme.colors.font1};
        font-weight: 800;
        font-size: 1.3em;

        h2 {
          margin: 0;
        }
      }
    }

    .ant-modal-close {
      color: ${({ theme }) => theme.colors.font1};
    }

    .ant-modal-body {
      background-color: inherit;
    }

    .top-label {
      font-size: 0.9em;
      line-height: 1em;
      margin-bottom: 0.7em;
    }
  }
`;
