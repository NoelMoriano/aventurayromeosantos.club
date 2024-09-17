import React, { createContext, useContext, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import { notification, Spinner } from "../components";
import { orderBy } from "lodash";

const GlobalDataContext = createContext({
  ticketsWithReservations: [],
  loadingData: false,
});

export const GlobalDataProvider = ({ children }) => {
  const [tickets = [], ticketsLoading, ticketsError] = useCollectionData(
    firestore.collection("tickets").where("isDeleted", "==", false) || null,
  );

  const [reservations = [], reservationsLoading, reservationsError] =
    useCollectionData(
      firestore.collection("reservations").where("isDeleted", "==", false) ||
        null,
    );

  const error = reservationsError || ticketsError;

  const loading = reservationsLoading || ticketsLoading;

  useEffect(() => {
    error && notification({ type: "error" });
  }, [error]);

  return (
    <GlobalDataContext.Provider
      value={{
        loadingData: loading,
        ticketsWithReservations: orderBy(
          tickets.map((ticket) => ({
            ...ticket,
            reservations: orderBy(
              reservations.filter(
                (reservation) => reservation.ticketId === ticket.id,
              ),
              (reservation) => [reservation.createAt],
              ["desc"],
            ),
          })),
          (ticket) => [ticket.createAt],
          ["desc"],
        ),
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
