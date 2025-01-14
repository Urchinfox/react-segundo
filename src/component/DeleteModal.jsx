import axios from "axios"
import { useEffect } from "react";

export default function DeleteModal({close,handleDelete,id,txt}){

    return (
        <div
          className='modal fade'
          tabIndex='-1'
          id="deleteModal"
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header bg-danger'>
                <h1 className='modal-title text-white fs-5' id='exampleModalLabel'>
                真的要刪除嗎？
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={close}
                />
              </div>
              <div className='modal-body'>刪除{txt}</div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' onClick={close}>
                  取消
                </button>
                <button type='button' className='btn btn-danger' onClick={()=>{handleDelete(id)}}>
                  確認刪除
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}