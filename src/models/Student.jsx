import User from "./User";
import { db } from '../firebase';
import { addDoc, setDoc, collection, doc } from "firebase/firestore";


export default class Student extends User{
    constructor(
        //params from User
        uid = '',
        id = '',
        first_name = '',
        last_name = '',
        pro_desc = '',
        img_url = '',
    ) {
        super(uid, id, first_name, last_name, email, pro_desc, img_url, 'student');
        //params specific to student
        this.current_pts = 0;
        this.spent_pts = 0;
        this.accumulated_pts = 0;
    }

    static async create ( id, first_name, last_name, email, password, pro_desc, img_url ) {
        //create a new signin and get the uid
        const new_uid = await User.create_signin ( email, password );

        if ( new_uid != null ) {
            const new_student = new Student(
                new_uid,
                id,
                first_name,
                last_name,
                pro_desc,
                img_url
            );

            //add the doc to the user collection
            //user the uwi id (id) as the document name
            const user_doc_ref = doc(db, 'Users', new_student.id );

            //use user doc reference
            try {
                await setDoc(user_doc_ref, { ...new_student } );

                //create the additional subcollection references and add to student document
                const notifications = collection ( user_doc_ref, 'Notifications' );
                    await addDoc ( notifications, {} );
                
                const point_log = collection ( user_doc_ref, 'PointLog' );
                    await addDoc ( point_log, {} );

                const redeem_log = collection ( user_doc_ref, 'RedeemLog' );
                    await addDoc ( redeem_log, {} );

            } catch (error) {
                console.error( 'error adding student to collection', error );
            }

            //add a leaderboard entry
        }
    }

    static async is_student ( id ) {
        try {
            const student = await User.get_by_id ( id );

            if ( student ) {
                return (student.role === 'student');
            }
        } catch ( error ) {
            console.error ( 'error checking if user is a student', error );
            throw error;
        }
    }

    //get student courses
    //get student redemptions
    //get student award points
}