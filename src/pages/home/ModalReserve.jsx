import React, { useState } from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDevice, useFormUtils } from "../../hooks";
import { currentConfig } from "../../config";
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
  Alert,
} from "../../components";
import { lighten } from "polished";
import dayjs from "dayjs";
import { CardSelectedTicket } from "./CardSelectedTicket.jsx";

export const ModalReserve = ({
  visibleModalReserve,
  onClickVisibleModalReserve,
  onSetTicketSelected,
  ticketSelected,
}) => {
  const { isMobile } = useDevice();

  const [loadingContact, setLoadingContact] = useState(false);

  const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.number().required(),
    dateToMeet: yup.mixed().required(),
    timeToMeet: yup.mixed().required(),
    priceOffer: yup.number(),
    message: yup.string(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  const onSubmitFetchContacts = async (formData) => {
    try {
      setLoadingContact(true);

      console.log("formData: ", formData);

      notification({ type: "success", title: "Enviado exitosamente" });
    } catch (e) {
      console.log("Error email send:", e);
      notification({ type: "error", placement: "topLeft" });
    } finally {
      setLoadingContact(false);
    }
  };

  const fetchSendEmail = async (contact) =>
    await fetch(`${currentConfig.servitecSalesApiUrl}/emails/contact`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": null,
        "content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(contact),
    });

  const mapContactData = (formData) => ({
    contact: {
      fullName: formData.fullName,
      email: formData.email,
      phone: {
        number: formData.phoneNumber,
        countryCode: formData.countryCode,
      },
      message: formData.message,
      hostname: "factura.servitec.site",
    },
  });

  const resetContactData = () =>
    reset({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+51",
      phoneNumber: "",
      message: "",
    });

  return (
    <ModalComponent
      title={
        <div>
          <h4 style={{ margin: "0", fontSize: "1.2em" }}>
            ¡Registra tu reunion y reserva tu entrada ya!
          </h4>
        </div>
      }
      closable
      closeModal={() => {
        onSetTicketSelected(null);
        return onClickVisibleModalReserve();
      }}
      visible={visibleModalReserve}
      onOk={() => onClickVisibleModalReserve()}
      onCancel={() => {
        onSetTicketSelected(null);
        return onClickVisibleModalReserve();
      }}
      footer={null}
    >
      <Form onSubmit={handleSubmit(onSubmitFetchContacts)}>
        <Row gutter={[16, 20]}>
          <Col span={24}>
            <div className="card-ticket-selected">
              <CardSelectedTicket ticket={ticketSelected} />
            </div>
          </Col>
          <Col span={24}>
            <Alert
              type="info"
              message="Solo datos necesario para ponernos en contácto"
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
              <Controller
                name="priceOffered"
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
