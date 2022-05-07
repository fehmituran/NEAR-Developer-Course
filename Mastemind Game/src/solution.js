import React from 'react';





export const Solution = (props) => {

  

  let solutionPegs = []
  let solutionClass = ''
  let slectcolor = []
  const isHidden = (props.state.defeat && !props.state.victory) ? '' : ' hidden'
  const playAgain = (!props.state.defeat && props.state.victory) ? '' : ' hidden'
  for (let i = 0; i < props.state.trueRow.length; i++) {
    solutionClass = props.state.trueRow[i]
    solutionPegs.push(
      <div
        className={'color-holder ' + solutionClass}
        key={'s_' + i}>
      </div>)

    slectcolor.push(solutionClass)
  }



 // localStorage.setItem('durum', this.state.victory)




  return (

    
    <div className='solution colors'>

      <div className={isHidden}>
        <p>Solution:</p>
        {solutionPegs}
        <a onClick={props.newGame}> Play Again?</a>
      </div>
      <div className={playAgain}>
        {localStorage.setItem('durum', props.state.victory)}
        <p onClick={props.newGame}> Play Again?</p>
        {localStorage.setItem('color', slectcolor)}
        
 
      </div>
    </div>
  )

}