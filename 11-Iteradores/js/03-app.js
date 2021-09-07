//FIZZ BUZZ

for(let i = 1; i < 100; i++){
    if ( i % 15 === 00){
        console.log(`${i} FIZZ BUZZ`);
    } else if( i % 3 === 0){
        console.log(`${i} fizz`);
    } else if (i % 5 === 0){
        console.log(`${i} buzz`);
    }
}