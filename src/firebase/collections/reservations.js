import { firestore } from "../index";
import {
  fetchCollectionOnce,
  fetchDocumentOnce,
  setDocument,
  updateDocument,
} from "../firestore";

export const reservationsRef = firestore.collection("reservations");

export const getReservationId = () => reservationsRef.doc().id;

export const fetchReservation = async (id) =>
  fetchDocumentOnce(reservationsRef.doc(id));

export const fetchReservationByDni = async (dni = "") =>
  fetchCollectionOnce(
    reservationsRef.where("dni", "==", dni).where("isDeleted", "==", false),
  );

export const fetchReservations = async () =>
  fetchCollectionOnce(reservationsRef.where("isDeleted", "==", false));

export const addReservation = async (reservation) =>
  setDocument(reservationsRef.doc(reservation.id), reservation);

export const updateReservation = async (reservationId, reservation) =>
  updateDocument(reservationsRef.doc(reservationId), reservation);
