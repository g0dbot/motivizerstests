import { addDoc, collection, doc, query, getDoc, getDocs, setDoc } from "firebase/firestore";

export default class Course {
    constructor (
        code = '',
        name = '',
        period = '',
        desc = '',
        img_url = ''
    ) {
        this.id = `${ code }-${ period }`;
        this.code = code;
        this.name = name;
        this.period = period;
        this.desc = desc;
        this.img_url = img_url;
    }

    static async create ( code, name, period, desc ) {
        try {
            //create a course to get course id
            const new_course = new Course ( code, name, period, desc, img_url );
            //ref to course collection
            const courses_collection = collection ( db, 'Courses' );

            //construct doc ref using course id as the docname
            const course_doc_ref = doc ( courses_collection, new_course.id );

            //set the doc in the collection
            await setDoc( course_doc_ref, { ...new_course });

            //create the additional subcollection references and add to course document
            const course_students_ref = collection ( course_doc_ref, 'CourseStudents' );
                await addDoc ( course_students_ref, {} );

            const course_staff_ref = collection ( course_doc_ref, 'CourseStaff' );
                await addDoc ( course_staff_ref, {} );

        } catch ( error ) {
            console.error ('error creating course', error );
            throw error;
        }
    }

    static async get_by_id ( id ) {
        try {
            const q = query ( collection ( db, 'Courses' ), where ( 'id', '==', id ) );
            const query_snapshot = await getDoc ( q );

            if ( !query_snapshot.empty ){
                const doc = query_snapshot.doc;
                const course = doc.data;

                return course;

            } else {
                return null;
            }

        } catch ( error ) {
            console.error( 'error getting course', error );
            throw error;
        }
    }

    static async get_all () {
        try {
            //crea ref to courses collection
            const courses_collection = collection(db, 'Courses');

            //query all docs in the collection
            const query_snapshot = await getDocs(courses_collection);

            //create empty array to store course data
            const courses = [];

            //traverse snapshots and push the data of each to the courses array
            query_snapshot.forEach((doc) => {
                courses.push(doc.data());
            });
            
            //return courses array
            return courses;

        } catch ( error ) {
            console.error ( 'error fetching courses:', error );
            throw error;
        }
    }

    static async enroll ( course_id, user_id ){
        try {
            //add to user courses array

            //add to respective subcollection
        } catch ( error ) {

        }
    }
}