update_pbar();

function update_pbar(){
    const courses = document.querySelector("#courses");
    let totalCredits = 0;
    let earnedCredits = 0;
    let passed = false;
    let credits = 0;
    for (const row of courses.children){
        if (!isNaN(parseFloat(row.children[2].innerHTML))){
            if (passed){
                earnedCredits += credits
            }
            credits = parseFloat(row.children[2].innerHTML)
            totalCredits += credits;
            passed = (row.children[4].className === "passed");
        } else {
            passed = passed && (row.children[4].className === "passed");
        }
    }
    if (passed){
        earnedCredits += credits;
    }
    console.log(totalCredits);
    const progressPercentage = Math.round(1000 * earnedCredits / totalCredits) / 10;
    document.querySelector("#progress-fill").style.height = `${progressPercentage}%`;
    document.querySelector("#progress-percentage").innerHTML = `${progressPercentage}%`;
}

function update_grade(form){
    console.log(form);
    const grade = parseFloat(form.children[0].value);
    if (!isNaN(grade)){
        if (0 <= grade && grade < 5.5){
        const cell = form.parentNode;
        cell.className = "failed";
        cell.innerHTML = grade;
        update_pbar();
        } else if (grade <= 10){
        const cell = form.parentNode;
        cell.className = "passed";
        cell.innerHTML = grade;
        update_pbar();
        } else {
        form.children[0].value = "";
        }
    } else {
        form.children[0].value = "";
    }
}