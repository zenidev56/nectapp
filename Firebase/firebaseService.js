import { auth, db, storage } from "@/config/firebaseConfig";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export class FirebaseService {
    studentCollectionRef = collection(db, "students");
    coachCollectionRef = collection(db, "coaches");
    jobImmersionProgramCollectionRef = collection(db, "jobImmersionProgram");
    assessmentCollectionRef = collection(db, "assessments");

    // Student functions
    async getStudents() {
        try {
            const snapshot = await getDocs(this.studentCollectionRef);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            throw error;
        }
    }

    async getStudentById(id) {
        try {
            const studentDoc = doc(this.studentCollectionRef, id);
            const snapshot = await getDoc(studentDoc);
            if (snapshot.exists()) {
                return { id: snapshot.id, ...snapshot.data() };
            } else {
                throw new Error("Student not found");
            }
        } catch (error) {
            throw error;
        }
    }

    async addStudent(firstName, middleName, lastName, email, phoneNumber, schoolName, graduationYear, program, fieldOfInterest) {
        try {
            const studentData = {
                firstName, middleName, lastName, email, phoneNumber, schoolName, graduationYear, program, fieldOfInterest
            };
            const res = await addDoc(this.studentCollectionRef, studentData);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async updateStudent(id, firstName, middleName, lastName, email, phoneNumber, schoolName, graduationYear, program, fieldOfInterest) {
        try {
            const studentDocRef = doc(this.studentCollectionRef, id);
            const updatedData = {
                firstName, middleName, lastName, email, phoneNumber, schoolName, graduationYear, program, fieldOfInterest
            };
            await updateDoc(studentDocRef, updatedData);
        } catch (error) {
            throw error;
        }
    }

    async deleteStudent(id) {
        try {
            const studentDocRef = doc(this.studentCollectionRef, id);
            await deleteDoc(studentDocRef);
        } catch (error) {
            throw error;
        }
    }

    // Coach functions
    async getCoaches() {
        try {
            const snapshot = await getDocs(this.coachCollectionRef);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            throw error;
        }
    }

    async getCoachById(id) {
        try {
            const coachDoc = doc(this.coachCollectionRef, id);
            const snapshot = await getDoc(coachDoc);
            if (snapshot.exists()) {
                return { id: snapshot.id, ...snapshot.data() };
            } else {
                throw new Error("Coach not found");
            }
        } catch (error) {
            throw error;
        }
    }

    async addCoach(firstName, middleName, lastName, email, phoneNumber, currentPosition, employer, linkedin, yearsOfExperience) {
        try {
            const coachData = {
                firstName, middleName, lastName, email, phoneNumber, currentPosition, employer, linkedin, yearsOfExperience
            };
            const res = await addDoc(this.coachCollectionRef, coachData);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async updateCoach(id, firstName, middleName, lastName, email, phoneNumber, currentPosition, employer, linkedin, yearsOfExperience) {
        try {
            const coachDocRef = doc(this.coachCollectionRef, id);
            const updatedData = {
                firstName, middleName, lastName, email, phoneNumber, currentPosition, employer, linkedin, yearsOfExperience
            };
            await updateDoc(coachDocRef, updatedData);
        } catch (error) {
            throw error;
        }
    }

    async deleteCoach(id) {
        try {
            const coachDocRef = doc(this.coachCollectionRef, id);
            await deleteDoc(coachDocRef);
        } catch (error) {
            throw error;
        }
    }

    // Job Immersion Program functions
    async getJobImmersionPrograms() {
        try {
            const snapshot = await getDocs(this.jobImmersionProgramCollectionRef);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            throw error;
        }
    }

    async getJobImmersionProgramById(id) {
        try {
            const programDoc = doc(this.jobImmersionProgramCollectionRef, id);
            const snapshot = await getDoc(programDoc);
            if (snapshot.exists()) {
                return { id: snapshot.id, ...snapshot.data() };
            } else {
                throw new Error("Job Immersion Program not found");
            }
        } catch (error) {
            throw error;
        }
    }

    async addJobImmersionProgram(title, description, duration, mentorId, startDate, endDate, enrolledStudents, status) {
        try {
            const programData = {
                title, description, duration, mentorId, startDate, endDate, enrolledStudents, status
            };
            const res = await addDoc(this.jobImmersionProgramCollectionRef, programData);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async updateJobImmersionProgram(id, title, description, duration, mentorId, startDate, endDate, enrolledStudents, status) {
        try {
            const programDocRef = doc(this.jobImmersionProgramCollectionRef, id);
            const updatedData = {
                title, description, duration, mentorId, startDate, endDate, enrolledStudents, status
            };
            await updateDoc(programDocRef, updatedData);
        } catch (error) {
            throw error;
        }
    }

    async deleteJobImmersionProgram(id) {
        try {
            const programDocRef = doc(this.jobImmersionProgramCollectionRef, id);
            await deleteDoc(programDocRef);
        } catch (error) {
            throw error;
        }
    }

    // Assessment functions
    async getAssessments() {
        try {
            const snapshot = await getDocs(this.assessmentCollectionRef);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            throw error;
        }
    }

    async getAssessmentById(id) {
        try {
            const assessmentDoc = doc(this.assessmentCollectionRef, id);
            const snapshot = await getDoc(assessmentDoc);
            if (snapshot.exists()) {
                return { id: snapshot.id, ...snapshot.data() };
            } else {
                throw new Error("Assessment not found");
            }
        } catch (error) {
            throw error;
        }
    }

    async addAssessment(userId, jobImmersionProgramId, skillScores, mentorId, feedback, timestamp) {
        try {
            const assessmentData = {
                userId, jobImmersionProgramId, skillScores, mentorId, feedback, timestamp
            };
            const res = await addDoc(this.assessmentCollectionRef, assessmentData);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async updateAssessment(id, userId, jobImmersionProgramId, skillScores, mentorId, feedback, timestamp) {
        try {
            const assessmentDocRef = doc(this.assessmentCollectionRef, id);
            const updatedData = {
                userId, jobImmersionProgramId, skillScores, mentorId, feedback, timestamp
            };
            await updateDoc(assessmentDocRef, updatedData);
        } catch (error) {
            throw error;
        }
    }

    async deleteAssessment(id) {
        try {
            const assessmentDocRef = doc(this.assessmentCollectionRef, id);
            await deleteDoc(assessmentDocRef);
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(file, path, metadata = {}) {
        try {
          
            const storageRef = ref(storage, path);

          
            const snapshot = await uploadBytes(storageRef, file, metadata);

         
            const downloadURL = await getDownloadURL(snapshot.ref);

            return {
                downloadURL,
                fullPath: snapshot.ref.fullPath,
                name: snapshot.ref.name
            };
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    // Function to upload a file and associate it with a document in Firestore
    async uploadFileAndAddToFirestore(file, path, collectionName, docData) {
        try {
            // Upload the file
            const fileData = await this.uploadFile(file, path);

            // Add file data to the document data
            const dataWithFile = {
                ...docData,
                fileURL: fileData.downloadURL,
                filePath: fileData.fullPath,
                fileName: fileData.name
            };

            // Add the document to Firestore
            const collectionRef = collection(db, collectionName);
            const docRef = await addDoc(collectionRef, dataWithFile);

            return {
                documentId: docRef.id,
                ...dataWithFile
            };
        } catch (error) {
            console.error("Error uploading file and adding to Firestore:", error);
            throw error;
        }
    }


}

const firebaseService = new FirebaseService();
export default firebaseService;