import React, { createContext, useContext, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import { notification, Spinner } from "../components";
import { orderBy } from "lodash";

const GlobalDataContext = createContext({
  tickets: [],
  users: [],
});

export const GlobalDataProvider = ({ children }) => {
  const [tickets = [], ticketsLoading, ticketsError] = useCollectionData(
    firestore.collection("tickets").where("isDeleted", "==", false) || null,
  );

  const [users = [], usersLoading, usersError] = useCollectionData(
    firestore.collection("users").where("isDeleted", "==", false) || null,
  );

  const error = usersError || ticketsError;

  const loading = usersLoading || ticketsLoading;

  useEffect(() => {
    error && notification({ type: "error" });
  }, [error]);

  if (loading) return <Spinner height="100svh" />;

  return (
    <GlobalDataContext.Provider
      value={{
        tickets: orderBy(tickets, (ticket) => [ticket.createAt], ["desc"]),
        users: orderBy(users, (user) => [user.createAt], ["desc"]),
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
