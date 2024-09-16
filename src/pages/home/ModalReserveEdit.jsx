import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
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

export const ModalReserveEdit = ({
  visibleModal,
  modalsData,
  onClickVisibleModal,
  setModalsData,
}) => {
  const [loading, setLoading] = useState(false);
  const [isDniValid, setIsDniValid] = useState(false);

  const { assignUpdateProps } = useDefaultFirestoreProps();

  const bestPriceOffer = (
    modalsData?.ticketWithReservations?.reservations || []
  )
    .filter((reservation) => reservation.priceOffer)
    .reduce((prev, cur) => {
      return +cur.priceOffer < +prev.priceOffer ? prev : cur;
    }, 0);

  const schema = yup.object({
    dni: yup.string().min(8).max(8).required(),
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
        title: "Dni no valido, para la actualización",
      });
    }
  }, [watch("dni")]);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      if (
        formData?.priceOffer &&
        +formData?.priceOffer <=
          (+bestPriceOffer === 0
            ? +modalsData.ticketWithReservations.price
            : +bestPriceOffer.priceOffer)
      )
        return notification({
          type: "warning",
          title:
            "No puedes ingresar un precio menor o igual al mejor precio ofertado hasta el momento",
        });

      await updateReservation(modalsData.user.id, assignUpdateProps(formData));
      notification({ type: "success", title: "Actualización exitosa" });
      resetData();
      onClickVisibleModal(false);
      setModalsData(null);
    } catch (e) {
      console.log("Error reserve updated:", e);
      notification({ type: "error", placement: "topLeft" });
    } finally {
      setLoading(false);
    }
  };

  const resetData = () =>
    reset({
      dni: "",
      priceOffer: "",
    });

  return (
    <ModalComponent
      title={
        <div>
          <h4 style={{ margin: "0", fontSize: "1.1em" }}>Mejorar oferta</h4>
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
          {isDniValid && (
            <>
              <Col span={24}>
                <div>
                  <div className="best-price">
                    <div>
                      Este es el mejor precio ofertado hasta el momento:
                    </div>
                    <div>
                      S/{" "}
                      {+bestPriceOffer === 0
                        ? modalsData?.user?.price
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
                <Button
                  type="primary"
                  width="100%"
                  margin="0"
                  block
                  size="large"
                  htmlType="submit"
                  loading={loading}
                  disabled={!isDniValid}
                  className="btn-send-reserve"
                >
                  Actualizar
                </Button>
              </Col>
            </>
          )}
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
