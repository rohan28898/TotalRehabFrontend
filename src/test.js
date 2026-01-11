function Test() {
    let pan='asdasfasfa';
    let cin='12r542645754745';
    let add='A/42 neeldepp opp sandehs preos';
    return (
        <>
            <div className='row' style={{border:'1px solid',borderRight:'2px solid'}}>
                <div className='col-md-3' style={{border:'1px solid',borderRight:'2px solid'}}>Parekh</div>
                <div className='col-md-6'>
                    <div className='row' style={{border:'1px solid',borderBottom:'2px solid',borderRight:'2px solid'}}>
                        <div className='col-md-12' >

                            <b>LORRY RECEIPT</b>
                        </div>
                    </div>
                   
                    <div className='row' style={{borderRight:'2px solid'}}>
                        <div className='col-md-12' style={{borderBottom:'2px solid',borderLeft:'1px solid'}}>

                            {add}
                        </div>
                    </div>
                  
                    <div className='row' style={{border:'1px solid',borderRight:'2px solid'}}>
                        <div className='col-md-6'>
                            <b>PAN NO</b>:{pan}
                        </div>
                        <div className='col-md-6'>
                            <b>CIN NO:</b>{cin}
                        </div>
                    </div>
                </div>
                <div className='col-md-3' style={{border:'1px solid'}}>
                    <b >TRANSPORT COPY</b>
                </div>
            </div>
        </>
    )
}
export default Test;