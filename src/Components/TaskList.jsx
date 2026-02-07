const TaskList = () => {
    return(
        <div className="task-grid">
              

              {/* Task card */}
              <div className="task-card" style={{position:'relative'}}>
                <h3>Complet React Assignment</h3>
                <p>Finish task manager UI and styling</p>
              


              <div className="task-meta">
                <span>Due:2026-02-10</span>
                <span className="priority-badge priority-high">High</span>
              </div>


              <div className="task-actions">
                <button
                   className="btn-icon"
                   style={{background:'#002dff'}}
                   title="Edit Task"
                   >
                     ✏️
                   </button>


                   <button
                     className="btn-icon"
                     style={{background:'#00b894'}}
                     title="Mark Complete"
                     >
                     ✔️
                     </button>

                     <button
                       className="btn-icon"
                       style={{background:'#ff416c'}}
                       title="Delete Task"
                       >
                        
                       </button>
                       </div>
                       </div>
                       </div>

              
    )
}
export default TaskList;