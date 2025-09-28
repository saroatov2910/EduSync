"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCareHandler = exports.updateCareHandler = exports.saveCareHandler = exports.deleteAppointment = exports.updateAppointment = exports.saveAppointment = exports.deleteFeedback = exports.updateFeedback = exports.saveFeedback = exports.deleteRequest = exports.updateRequest = exports.saveRequest = exports.deleteStudent = exports.updateStudent = exports.saveStudent = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
const db = admin.firestore();
// -----------------------------
// Student Functions
// -----------------------------
exports.saveStudent = functions.https.onCall(async (request) => {
    const data = request.data;
    const newStudent = { ...data, createdAt: admin.firestore.Timestamp.now() };
    await db.collection('students').add(newStudent);
    return { success: true };
});
exports.updateStudent = functions.https.onCall(async (request) => {
    const { studentId, ...rest } = request.data;
    if (!studentId)
        throw new functions.https.HttpsError('invalid-argument', 'studentId is required');
    await db.collection('students').doc(String(studentId)).set(rest, { merge: true });
    return { success: true };
});
exports.deleteStudent = functions.https.onCall(async (request) => {
    const { studentId } = request.data;
    if (!studentId)
        throw new functions.https.HttpsError('invalid-argument', 'studentId is required');
    await db.collection('students').doc(String(studentId)).delete();
    return { success: true };
});
// -----------------------------
// Request Functions
// -----------------------------
exports.saveRequest = functions.https.onCall(async (request) => {
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
exports.updateRequest = functions.https.onCall(async (request) => {
    const { requestId, ...rest } = request.data;
    if (!requestId)
        throw new functions.https.HttpsError('invalid-argument', 'requestId is required');
    await db.collection('requests').doc(String(requestId)).set(rest, { merge: true });
    return { success: true };
});
exports.deleteRequest = functions.https.onCall(async (request) => {
    const { requestId } = request.data;
    if (!requestId)
        throw new functions.https.HttpsError('invalid-argument', 'requestId is required');
    await db.collection('requests').doc(String(requestId)).delete();
    return { success: true };
});
// -----------------------------
// Feedback Functions
// -----------------------------
exports.saveFeedback = functions.https.onCall(async (request) => {
    const data = request.data;
    const newFeedback = { ...data, feedbackDate: admin.firestore.Timestamp.now() };
    await db.collection('feedbacks').add(newFeedback);
    return { success: true };
});
exports.updateFeedback = functions.https.onCall(async (request) => {
    const { feedbackId, ...rest } = request.data;
    if (!feedbackId)
        throw new functions.https.HttpsError('invalid-argument', 'feedbackId is required');
    await db.collection('feedbacks').doc(String(feedbackId)).set(rest, { merge: true });
    return { success: true };
});
exports.deleteFeedback = functions.https.onCall(async (request) => {
    const { feedbackId } = request.data;
    if (!feedbackId)
        throw new functions.https.HttpsError('invalid-argument', 'feedbackId is required');
    await db.collection('feedbacks').doc(String(feedbackId)).delete();
    return { success: true };
});
// -----------------------------
// Appointment Functions
// -----------------------------
exports.saveAppointment = functions.https.onCall(async (request) => {
    const data = request.data;
    await db.collection('appointments').add(data);
    return { success: true };
});
exports.updateAppointment = functions.https.onCall(async (request) => {
    const { appointmentId, ...rest } = request.data;
    if (!appointmentId)
        throw new functions.https.HttpsError('invalid-argument', 'appointmentId is required');
    await db.collection('appointments').doc(String(appointmentId)).set(rest, { merge: true });
    return { success: true };
});
exports.deleteAppointment = functions.https.onCall(async (request) => {
    const { appointmentId } = request.data;
    if (!appointmentId)
        throw new functions.https.HttpsError('invalid-argument', 'appointmentId is required');
    await db.collection('appointments').doc(String(appointmentId)).delete();
    return { success: true };
});
// -----------------------------
// CareHandler Functions
// -----------------------------
exports.saveCareHandler = functions.https.onCall(async (request) => {
    const data = request.data;
    await db.collection('care_handlers_v1').add(data);
    return { success: true };
});
exports.updateCareHandler = functions.https.onCall(async (request) => {
    const { handlerId, ...rest } = request.data;
    if (!handlerId)
        throw new functions.https.HttpsError('invalid-argument', 'handlerId is required');
    await db.collection('care_handlers_v1').doc(String(handlerId)).set(rest, { merge: true });
    return { success: true };
});
exports.deleteCareHandler = functions.https.onCall(async (request) => {
    const { handlerId } = request.data;
    if (!handlerId)
        throw new functions.https.HttpsError('invalid-argument', 'handlerId is required');
    await db.collection('care_handlers_v1').doc(String(handlerId)).delete();
    return { success: true };
});
