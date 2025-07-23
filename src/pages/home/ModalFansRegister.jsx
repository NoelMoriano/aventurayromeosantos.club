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
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
  TextArea,
  Alert,
} from "../../components";
import { lighten } from "polished";
import { capitalize, isEmpty } from "lodash";
import { addUser, fetchUserByDni, getUserId } from "../../firebase/collections";

export const ModalFansRegister = ({ visibleModal, onClickVisibleModal }) => {
  const { isMobile } = useDevice();
  const { assignCreateProps } = useDefaultFirestoreProps();

  const [loadingContact, setLoadingContact] = useState(false);

  const schema = yup.object({
    dni: yup.string().min(8).max(8).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().min(9).max(9).required(),
    message: yup.string(),
    is: yup.string(),
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

  const onSubmitUser = async (formData) => {
    try {
      setLoadingContact(true);

      const user = await existsUser(formData.dni);
      if (!isEmpty(user))
        return notification({
          type: "warning",
          title: "Lo siento no puedes volver a usar el mismo DNI",
        });

      await addUser(assignCreateProps(mapUserData(formData)));

      notification({ type: "success", title: "Registrado exitosamente" });
      onClickVisibleModal();
    } catch (e) {
      console.log("Error save reserve:", e);
      notification({
        type: "error",
        title: "¡Ocurrió un problema, comunícate por WhatsApp, por favor!",
      });
    } finally {
      resetReservationData();
      setLoadingContact(false);
    }
  };

  const mapUserData = (formData) => ({
    id: getUserId(),
    dni: formData.dni,
    firstName: formData.firstName.toLowerCase(),
    lastName: formData.lastName.toLowerCase(),
    email: formData.email.toLowerCase(),
    phoneNumber: formData.phoneNumber,
    message: formData?.message || "",
  });

  const resetReservationData = () =>
    reset({
      dni: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
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
          const user = await existsUser(dniFormData);
          if (!isEmpty(user))
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

  const existsUser = async (dni = "") => {
    const users = await fetchUserByDni(dni);
    return users?.[0];
  };

  return (
    <ModalComponent
      title={
        <div>
          <h4 style={{ margin: "0", fontSize: "1.1em" }}>
            ¡Quiero ser parte de los miles de fans!
          </h4>
        </div>
      }
      closable
      closeModal={() => onClickVisibleModal()}
      open={visibleModal}
      onOk={() => onClickVisibleModal()}
      onCancel={() => onClickVisibleModal()}
      footer={null}
    >
      <Form onSubmit={handleSubmit(onSubmitUser)}>
        <Row gutter={[16, 20]}>
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
            <Alert
              showIcon
              style={{
                background: "lightblue",
                border: "lightblue",
                fontSize: 11,
              }}
              message="Al registrarte, aceptas ser parte de los miles de fans de aventura y Romeo Santos, y recibir promociones, noticias, brindar tus datos y participar en eventos exclusivos."
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
              Registrarme
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
