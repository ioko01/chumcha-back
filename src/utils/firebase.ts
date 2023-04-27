
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as functions from 'firebase-functions';
import serviceAccount from "./serviceAccountKey.json";


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: 'https://chumcha-cd2f7.firebaseio.com',
});

export const db = admin.firestore();
