import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// -----------------------------
// Student Functions
// -----------------------------
export const saveStudent = functions.https.onCall(async (request) => {
  const data = request.data;
  const newStudent = { ...data, createdAt: admin.firestore.Timestamp.now() };
  await db.collection('students').add(newStudent);
  return { success: true };
});

export const updateStudent = functions.https.onCall(async (request) => {
  const { studentId, ...rest } = request.data;
  if (!studentId) throw new functions.https.HttpsError('invalid-argument', 'studentId is required');
  await db.collection('students').doc(String(studentId)).set(rest, { merge: true });
  return { success: true };
});

export const deleteStudent = functions.https.onCall(async (request) => {
  const { studentId } = request.data;
  if (!studentId) throw new functions.https.HttpsError('invalid-argument', 'studentId is required');
  await db.collection('students').doc(String(studentId)).delete();
  return { success: true };
});

// -----------------------------
// Request Functions
// -----------------------------
export const saveRequest = functions.https.onCall(async (request) => {
  const data = request.data;
  const newRequest = { ...data, requestDate: admin.firestore.Timestamp.now() };
  const docRef = await db.collection('requests').add(newRequest);

  if (data.handlerId) {
    await db.collection('notifications').add({
      handlerId: data.handlerId,
      requestId: docRef.id,
      message: `New request assigned: ${data.title || 'No title'}`,
      createdAt: admin.firestore.Timestamp.now(),
      read: false,
    });
  }

  return { success: true, id: docRef.id };
});

export const updateRequest = functions.https.onCall(async (request) => {
  const { requestId, ...rest } = request.data;
  if (!requestId) throw new functions.https.HttpsError('invalid-argument', 'requestId is required');
  await db.collection('requests').doc(String(requestId)).set(rest, { merge: true });
  return { success: true };
});

export const deleteRequest = functions.https.onCall(async (request) => {
  const { requestId } = request.data;
  if (!requestId) throw new functions.https.HttpsError('invalid-argument', 'requestId is required');
  await db.collection('requests').doc(String(requestId)).delete();
  return { success: true };
});

// -----------------------------
// Feedback Functions
// -----------------------------
export const saveFeedback = functions.https.onCall(async (request) => {
  const data = request.data;
  const newFeedback = { ...data, feedbackDate: admin.firestore.Timestamp.now() };
  await db.collection('feedbacks').add(newFeedback);
  return { success: true };
});

export const updateFeedback = functions.https.onCall(async (request) => {
  const { feedbackId, ...rest } = request.data;
  if (!feedbackId) throw new functions.https.HttpsError('invalid-argument', 'feedbackId is required');
  await db.collection('feedbacks').doc(String(feedbackId)).set(rest, { merge: true });
  return { success: true };
});

export const deleteFeedback = functions.https.onCall(async (request) => {
  const { feedbackId } = request.data;
  if (!feedbackId) throw new functions.https.HttpsError('invalid-argument', 'feedbackId is required');
  await db.collection('feedbacks').doc(String(feedbackId)).delete();
  return { success: true };
});

// -----------------------------
// Appointment Functions
// -----------------------------
export const saveAppointment = functions.https.onCall(async (request) => {
  const data = request.data;
  await db.collection('appointments').add(data);
  return { success: true };
});

export const updateAppointment = functions.https.onCall(async (request) => {
  const { appointmentId, ...rest } = request.data;
  if (!appointmentId) throw new functions.https.HttpsError('invalid-argument', 'appointmentId is required');
  await db.collection('appointments').doc(String(appointmentId)).set(rest, { merge: true });
  return { success: true };
});

export const deleteAppointment = functions.https.onCall(async (request) => {
  const { appointmentId } = request.data;
  if (!appointmentId) throw new functions.https.HttpsError('invalid-argument', 'appointmentId is required');
  await db.collection('appointments').doc(String(appointmentId)).delete();
  return { success: true };
});

// -----------------------------
// CareHandler Functions
// -----------------------------
export const saveCareHandler = functions.https.onCall(async (request) => {
  const data = request.data;
  await db.collection('care_handlers_v1').add(data);
  return { success: true };
});

export const updateCareHandler = functions.https.onCall(async (request) => {
  const { handlerId, ...rest } = request.data;
  if (!handlerId) throw new functions.https.HttpsError('invalid-argument', 'handlerId is required');
  await db.collection('care_handlers_v1').doc(String(handlerId)).set(rest, { merge: true });
  return { success: true };
});

export const deleteCareHandler = functions.https.onCall(async (request) => {
  const { handlerId } = request.data;
  if (!handlerId) throw new functions.https.HttpsError('invalid-argument', 'handlerId is required');
  await db.collection('care_handlers_v1').doc(String(handlerId)).delete();
  return { success: true };
});
