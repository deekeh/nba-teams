import "./Sidebar.scss";

function Sidebar(props) {
  return <aside className={`Sidebar ${props.state ? 'on' : 'off'}`}>
    <button className="overlay" onClick={props.toggleSidebar} />

    <section className="data-box">
      <header className="data-box-header">
        <div className="team-name">
          {props.data?.home_team?.name || "NA"}
        </div>
        <button className="close-sidebar" onClick={props.toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </header>

      <section className="data-box-info">
        <div className="data-row">
          <div className="data-cell">Team Full Name</div>
          <div className="data-cell">
            {props.data?.home_team?.full_name || "NA"}
          </div>
        </div>
        <div className="data-row">
          <div className="data-cell">Total Games in 2021</div>
          <div className="data-cell">
            {props.data?.period || "NA"}
          </div>
        </div>

        <div className="section-heading">Random Game Details:</div>
        <div className="data-row">
          <div className="data-cell bold">Date</div>
          <div className="data-cell bold">
            {props.data?.date?.substr(0, 10) || "NA"}
          </div>
        </div>
        <div className="data-row">
          <div className="data-cell bold">Home Team</div>
          <div className="data-cell bold">
            {props.data?.home_team?.name || "NA"}
          </div>
        </div>
        <div className="data-row">
          <div className="data-cell bold">Home Team Score</div>
          <div className="data-cell bold">
            {props.data?.home_team_score || "NA"}
          </div>
        </div>
        <div className="data-row">
          <div className="data-cell bold">Visitor Team</div>
          <div className="data-cell bold">
            {props.data?.visitor_team?.name || "NA"}
          </div>
        </div>
        <div className="data-row">
          <div className="data-cell bold">Visitor Team Score</div>
          <div className="data-cell bold">
            {props.data?.visitor_team_score || "NA"}
          </div>
        </div>

      </section>
    </section>

  </aside>
}

export default Sidebar;
