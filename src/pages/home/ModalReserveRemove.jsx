import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
} from "../../components/index.js";
import { mediaQuery } from "../../styles/index.js";
import { lighten } from "polished";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../hooks/index.js";
import { updateReservation } from "../../firebase/collections/reservations.js";

export const ModalReserveRemove = ({
  visibleModal,
  onClickVisibleModal,
  setModalsData,
  modalsData,
}) => {
  const [loading, setLoading] = useState(false);
  const [isDniValid, setIsDniValid] = useState(false);

  const { assignDeleteProps } = useDefaultFirestoreProps();

  const schema = yup.object({
    dni: yup.string().min(8).max(8).required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      dni: "",
    },
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    if (watch("dni").length === 8) {
      if (watch("dni") === modalsData?.user?.dni) {
        return setIsDniValid(true);
      }

      setIsDniValid(false);
      return notification({
        type: "warning",
        title: "DNI no válido, para la actualización",
      });
    }
  }, [watch("dni")]);

  const onSubmit = async (formData) => {
    try {
      if (formData.dni !== modalsData.user.dni)
        return notification({
          type: "warning",
          title: "El número DNI no es válido",
        });

      await updateReservation(
        modalsData.user.id,
        assignDeleteProps({ isDeleted: true }),
      );
      notification({
        type: "success",
        title: "Su registro fue eliminado exitosamente",
      });
      onClickVisibleModal(false);
      setModalsData(null);
      resetData();
    } catch (e) {
      console.log("Error reserve deleted:", e);
      notification({
        type: "error",
        title: "¡Ocurrió un problema, comunícate por WhatsApp, por favor!",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => reset({ dni: "" });

  return (
    <ModalComponent
      title={
        <div>
          <h4 style={{ margin: "0", fontSize: "1.1em" }}>Eliminar registro</h4>
        </div>
      }
      closable
      closeModal={() => {
        setModalsData(null);
        return onClickVisibleModal();
      }}
      open={visibleModal}
      onOk={() => onClickVisibleModal()}
      onCancel={() => {
        setModalsData(null);
        return onClickVisibleModal();
      }}
      footer={null}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Col span={24}>
            <Button
              type="primary"
              width="100%"
              margin="0"
              block
              size="large"
              htmlType="submit"
              loading={loading}
              className="btn-send-reserve"
              disabled={!isDniValid}
            >
              Eliminar
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
