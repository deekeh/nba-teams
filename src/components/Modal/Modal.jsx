import "./Modal.scss";

function Modal(props) {
  return <section className={`Modal${props.showModal ? ' on' : ' off'}`}>
    <button className="modal-overlay" onClick={props.toggleModal} />
    <div className="modal-box">
      <header className="modal-header">
        Search Results
        <button className="close-modal" onClick={props.toggleModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button>
      </header>

      <div className="divider"></div>

      <ul className="players-list">
        {
          props.playerData?.length > 0 ?
            props.playerData?.map((player, idx) => <li key={idx} className="player">
              {player.first_name} {player.last_name}
            </li>) :
            "No players found"
        }
      </ul>
    </div>
  </section>
}

export default Modal;
