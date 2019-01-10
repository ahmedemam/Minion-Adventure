let count = 0; 
let clearTime; 
let seconds = 0; 
let minutes = 0; 
let hours = 0; 
let clearState; 
let getSecs, getMins, getHours;

function startWatch() 
{  
    if ( seconds === 60 ) 
    { 
        seconds = 0; 
        minutes = minutes + 1; 
    }
    /* you use the javascript tenary operator to format how the minutes should look and add 0 to minutes if less than 10 */ 
    getMins = ( minutes < 10 ) ? ( '0' + minutes + ': ' ) : ( minutes + ': ' ); 

    if ( minutes === 60 ) 
    { 
        minutes = 0; 
        hours = hours + 1; 
    } 
    /* you use the javascript tenary operator to format how the hours should look and add 0 to hours if less than 10 */ 
    getHours = ( hours < 10 ) ? ( '0' + hours + ': ' ) : ( hours + ': ' );
    getSecs = ( seconds < 10 ) ? ( '0' + seconds ) : ( seconds ); 
    
    // display the stopwatch
    let x = document.getElementById("timer"); 
    x.innerHTML = 'Time: ' + getHours + getMins + getSecs; 
    seconds++; 
    /* call the setTimeout( ) to keep the stopWatch worked*/ 
    clearTime = setTimeout( startWatch, 1000 ); 
}  


function startTime() 
{  
    if ( seconds === 0 && minutes === 0 && hours === 0 ) 
    {
        startWatch(); 
    } 
}


function stopTime() 
{ 
    if ( seconds !== 0 || minutes !== 0 || hours !== 0 ) 
    { 
        seconds = 0; 
        minutes = 0; 
        hours = 0; 
        getSecs = '0' + seconds; 
        getMins = '0' + minutes + ': '; 
        getHours = '0' + hours + ': '; 

        /* display the stopwatch after it's been stopped */ 
        let x = document.getElementById ("timer"); 
        let stopTime = getHours + getMins + getSecs; 
        x.innerHTML = stopTime;
        /* clear the stop watch using the setTimeout( ) return value 'clearTime' as ID */ 
        clearTimeout( clearTime ); 
    } 
}

export {
    startTime,
    stopTime,
    startWatch
}