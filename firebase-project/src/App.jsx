import React, { useEffect, useState } from 'react'
import { Auth } from './components/Auth'
import { db ,auth,storage} from './config/firebase';
import { getDocs, collection,addDoc, deleteDoc,doc, updateDoc} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

const App = () => {
    const [movieList, setMovieList] = useState([]);


    //new movie title
    const[newMovieTitle,setNewMovieTitle]=useState("");
    const[newReleaseDate,setNewReleaseDate]=useState(0);
    const[isNewMovieOscar,setIsNewMovieOscar]=useState(false);

    //update name state
    const[updatedMovieTitle,setUpdatedMovieTitle]=useState("")

    //file upload state
    const[fileupload,setfileupload]=useState(null)

    const moviesCollectionRef = collection(db, "movies")

    const getMovieList = async () => {
        //read the data
        //set the movielist
        try {
            const data = await getDocs(moviesCollectionRef)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            console.log(filteredData);
            setMovieList(filteredData)

        }
        catch (err) {
            console.error(err);
        }
    }

    const deleteMovie = async(id) => {
        const movieDoc = doc(db,"movies",id)
        await deleteDoc(movieDoc)
        setMovieList((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    }

    useEffect(() => {
        getMovieList();

    }, [])

    const onSubmitNewMovie = async () => {
        if (!auth.currentUser) {
            console.error("User not logged in.");
            return;
        }
        try {
            await addDoc(moviesCollectionRef, {
                name: newMovieTitle,
                releaseDate: newReleaseDate,
                receivedAnOscar: isNewMovieOscar,
                userId: auth.currentUser.uid,
            });
            getMovieList();
        } catch (err) {
            console.error(err);
        }
    };
    

    const updateMovieTitle= async(id) => {
        const movieDoc = doc(db,"movies",id)
        await updateDoc(movieDoc,{name:updatedMovieTitle});
        setMovieList((prevMovies) =>
            prevMovies.map((movie) =>
                movie.id === id ? { ...movie, name: updatedMovieTitle } : movie
            ));
     

    }

    const uploadFile = async() => {
        if (!fileupload) return;
        const filesFolderRef = ref(storage,`project-files/${fileupload.name}`);
        try{
        await uploadBytes(filesFolderRef,fileupload)}
        catch(err){
            console.error(err)
        }

    }

    return (
        <>
    <Auth />
    <div className='text-center'>

        <div>
            <input type="text" placeholder='moviename' onChange={(e)=>(setNewMovieTitle(e.target.value))} />
            <input type="releaseDate" placeholder='releaseDate' onChange={(e)=>(setNewReleaseDate(Number(e.target.value)))} />
            <input type="checkbox" onChange={(e)=>(setIsNewMovieOscar(e.target.checked))} checked={isNewMovieOscar}/>
            <label   >Received An Oscar</label>
            <button className='m-2 bg-slate-600 text-white p-1' onClick={onSubmitNewMovie}>Submit new movie</button>
        </div>

        {movieList.map((movie) => (
            <div key={movie.name}>  {/* Add a unique key here, assuming name is unique */}
                <h1 className={`${movie.receivedAnOscar ? 'text-green-600':'text-red-700'} text-[3em]`}>{movie.name}</h1>
                <p>{movie.releaseDate}</p>
                <button onClick={()=>{
                    deleteMovie(movie.id)
                }}>Delete Movie</button>
                <input type="text" placeholder='new title...' onChange={(e)=>{
                    setUpdatedMovieTitle(e.target.value)
                }} />
                <button onClick={()=>{updateMovieTitle(movie.id,updateMovieTitle)}}>Update Title</button>
            </div>
        ))}
        <input type="file" onChange={(e)=>setfileupload(e.target.files[0]

        )}/>
        <button onClick={uploadFile}>Submit File</button>
    </div>
    </>

    )
}

export default App