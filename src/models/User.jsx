import { auth, db } from '../firebase';
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { collection, query, getDoc } from "firebase/firestore";

export default class User{
    constructor(
        uid = '',
        id = '',
        first_name = '',
        last_name = '',
        email = '',
        pro_desc = '',
        img_url = '',
        role = '',
    ){
        this.uid = uid;
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.pro_desc = pro_desc;
        this.img_url = img_url;
        this.role = role;
    }
    
    //checks if a user email has already been used for signup
    async signin_already_exists( email ){

        try{
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            
            return signInMethods.length != 0;
        } catch (error) {
            console.error('error checking signin', error);
            throw error;
        }
    }

    //creates a sign in for the user and returns the uid created
    static async create_signin ( email, password) {
        try {
            //check if the email already exists for signin
            if ( !signin_alreay_exists ( email )){
                //create a signin for the user
                const user_credential = await createUserWithEmailAndPassword(auth, email, password);

                return user_credential.uid;
            }
        } catch (error) {
            console.error('error creating signin', error);
            return null;
        }
    }

    //get user by uid
    static async get_by_uid ( uid ) {
        try {
            const q = query ( collection ( db, 'Users' ), where ( 'uid', '==', uid ) );
            const query_snapshot = await getDoc ( q );

            if (!query_snapshot.empty) {
                const doc = query_snapshot.doc;
                const user = doc.data();

                return user;

            } else {
                return null;

            }
        } catch ( error ) {
            console.error ('error getting user', error);
            throw error;
        }
    }

    //get user by id ( uwi id )
    static async get_by_id ( id ) {
        try {
            const q = query ( collection ( db, 'Users' ), where ( 'id', '==', id ));
            const query_snapshot = await getDoc ( q );

            if (!query_snapshot.empty) {
                const doc = query_snapshot.doc;
                const user = doc.data();

                return user;
            } else {
                return null;
            }
        } catch ( error ) {
            console.error ('error getting user', error);
            throw error;
        }
    }

    //search users
    //update/edit user
}