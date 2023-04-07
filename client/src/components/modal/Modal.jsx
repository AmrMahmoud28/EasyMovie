import ReactDOM from 'react-dom';
import './modal.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';
import { useEffect } from 'react';

const Modal = ({toggleModal, modal, trailerSrc}) => {
  const modalRef = useRef(null);

  useEffect(() =>{
    if(modal){
      modalRef.current.classList.add('modalActive');
    }
  }, [modal])

  return ReactDOM.createPortal(
    <>
      {modal && (
        <div className="modal">
          <div ref={modalRef} className="modal__content">
            <iframe src={`${trailerSrc}?autoplay=1`} width="100%" height="500px" title="trailer" allow="fullscreen;" ></iframe>
            <button className='closeModal' onClick={toggleModal}><CloseIcon sx={{ fontSize: 27 }}/></button>
          </div>
        </div>
      )}
    </>,
    document.getElementById('portal')
  )
}

export default Modal