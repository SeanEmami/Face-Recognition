import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {

    return (
        <div>
            <p className='f4 light gray'>
                {'This Magic Face will detect faces in your pictures!'}
                <div className='center'>
                    <div className='form center pa4 br3 '>
                        <input className='f3 pa2 w-70 center' type='text' onChange={onInputChange} />
                        <button className='w-30 grow f3 link ph3 pv2 dib white bg-light-green' onClick={onButtonSubmit}><h3>Detect</h3></button>
                    </div>


                </div>

            </p>

        </div>

    );

}

export default ImageLinkForm;