import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import { storage } from '../../index.js';
import './UploadImageComponent.css'


const UploadImageComponent = ({ imageName }) => {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const result = await storage
                    .ref(`gym_images`)
                    .child(imageName)
                    .getDownloadURL();
                setUrl(result);
            } catch (e) {

            }
        };
        fetchImage();
    }, []);

    async function uploadImage() {
        if(image) {
            const progress = (snapshot) => {

            };
            const error = (err) => {
                //console.error(err)
            }
            const complete = () => {
                storage
                    .ref(`gym_images`)
                    .child(imageName)
                    .getDownloadURL()
                    .then(urlResponse => {
                        console.log(urlResponse);
                        setUrl(urlResponse)
                    })
            }
            const uploadTask = storage.ref(`gym_images/${imageName}`).put(image)
            await uploadTask.on('state_changed', progress, error, complete)
        }
    }

    function addImage(event) {
        const newImage = event.target.files[0];
        if(newImage) {
            setImage(newImage)
        }
    }


    return (
        <div id={'uploadDiv'}>
        <input type={'file'} onChange={addImage}/>
            <Button
                type="primary"
                shape="round"
                onClick={uploadImage}
            >
                Upload
            </Button>
            {url
                ? <img className={'displayImage-container'} src={url} />
                : null
            }
        </div>
    )
};

export default UploadImageComponent