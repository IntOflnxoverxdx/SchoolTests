let code = document.querySelector(".cells")
let qr = document.querySelector(".qr")


for (let f = 0; f < 30; f++) {
    document.querySelector(".questions").innerHTML += `<div class="question__number"=">${f+1}</div>`
}


for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
        if (i <= 6 && j >= 8 && j <=12){
            code.innerHTML += `<div class="cell c${i*21+j} yellow"></div>`
        }else if (i >= 8 && i <= 11 && j>= 8 && j <=17 || i >= 16 && i <= 19 && j>= 8 && j <=17){
            containment = ""
            if (i%2 == 0){
                if (j%2==0){
                    containment+="A"
                }else{
                    containment += "B"
                }
            }else{
                if (j%2==0){
                    containment+="C"
                }else{
                    containment += "D"
                }
            }
            code.innerHTML += `<div class="cell c${i*21+j} pink">${containment}</div>`
        }else if (i >= 12 && i <= 15 && j>= 8 && j <=17){
            containment = ""
            if (i%2 == 0){
                if (j%2==0){
                    containment+="A"
                }else{
                    containment += "B"
                }
            }else{
                if (j%2==0){
                    containment+="C"
                }else{
                    containment += "D"
                }
            }
            code.innerHTML += `<div class="cell c${i*21+j} blue">${containment}</div>`
        }
        else if (i >= 8 && i <= 19 && j>= 18){
            code.innerHTML += `<div class="cell c${i*21+j} orange"></div>`
        }
        else if (i >= 19 && j >= 8 && j <= 11){
            code.innerHTML += `<div class="cell c${i*21+j} grey"></div>`
        }else if (i >= 19 && j >= 12){
            code.innerHTML += `<div class="cell c${i*21+j} green"></div>`
        }
        else code.innerHTML += `<div class="cell c${i*21+j}"></div>`
    }
}

document.querySelectorAll(".cell").forEach(cell => {
    cell.onclick = ()=>{
        cell.classList.toggle("black")
    }
});


function isOnlyOneTrue(a, b, c, d) {
    const countTrue = [a, b, c, d].filter(Boolean).length;
    let ans = ""
    if (a){ans = "A"}
    if (b){ans = "B"}
    if (c){ans = "C"}
    if (d){ans = "D"}
    return [countTrue === 1,ans];
  }


document.querySelector(".send").addEventListener("click",(e)=>{
    e.preventDefault();
    let id = ""
    document.querySelectorAll(".yellow").forEach(cell => {
        id += cell.classList.contains("black")?"1":0
    });
    let year = ""
    document.querySelectorAll(".grey").forEach(cell => {
        year += cell.classList.contains("black")?"1":0
    });

    let date = ""
    document.querySelectorAll(".green").forEach(cell => {
        date += cell.classList.contains("black")?"1":0
    });
    let day = date.slice(0,5)
    let month = date.slice(5,12)

    let info = ""
    document.querySelectorAll(".orange").forEach(cell => {
        info += cell.classList.contains("black")?"1":0
    });
    let grade = info.slice(0,4)
    let subject = info.slice(4,8)
    let test = info.slice(8,12)

    let answers = ""
    document.querySelectorAll(".pink").forEach(cell => {
        answers += cell.classList.contains("black")?"1":0
    });
    let answers1 = answers.slice(0,40)
    let answers3 = answers.slice(40,80)
    let answers2 = ""
    document.querySelectorAll(".blue").forEach(cell => {
        answers2 += cell.classList.contains("black")?"1":0
    });
    

    right_answers = 0
    total_questions = 10
    let plus = 0
    for (let i = 0; i < 10; i++) {
        
        
        
        if (i>4){
            plus = 10
        }
        //console.log(i*2+plus);
        truths = isOnlyOneTrue(answers1[i*2+plus] == "1",
            answers1[i*2+1+plus] == "1",
            answers1[i*2+10+plus] == "1",
            answers1[i*2+11+plus] == "1") 
        if (truths[0]){
            if (truths[1] == data.answers[i]){
                console.log("круто");
                right_answers++
            }
        }
    }
    console.log(right_answers);
    


    document.querySelector("body").innerHTML+=`
    <div class="results">
        <h2>Результаты ${parseInt(day,2)}.${parseInt(month,2)}.${2023+parseInt(year,2)} Тест 1</h2>
        <h3>${students[parseInt(grade,2)][parseInt(id,2)]}</h3>
        <h4>${right_answers/total_questions*100}/${total_questions}</h4>
    </div>
    `
})