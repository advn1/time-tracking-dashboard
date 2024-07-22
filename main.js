const weekly_hours_current = document.getElementsByClassName("hours-text")
const weekly_hours_previous = document.getElementsByClassName("last-text")

const modes_list = document.getElementsByClassName("switch");

let current_mode = document.getElementsByClassName("current-mode")[0]
let json_parsed;

function fetchJSONData() {
    fetch("./data.json")
        .then(res => res.json())
        .then((data) => json_parsed = data)
}

fetchJSONData()

for (let mode of modes_list) {
    mode.addEventListener("click", () => {
        if (mode.classList.contains("current-mode")) {
            mode.classList.remove("current-mode")
        } else {
            mode.classList.add("current-mode")
            console.log(current_mode,mode)
            if (current_mode != mode && current_mode !== null) {
                current_mode.classList.remove("current-mode")
            }
            current_mode = mode
            Logic()
        }
        current_modes = document.getElementsByClassName("current-mode")
    })
}

function Logic() {
    json_parsed.forEach((el, idx) => {
        let current = null
        let previous = null
        
        if (current_mode.innerHTML === "Daily") {
            current = el.timeframes.daily.current
            previous = el.timeframes.daily.previous
        } else if (current_mode.innerHTML === "Weekly") {
            current = el.timeframes.weekly.current
            previous = el.timeframes.weekly.previous
    
        } else if (current_mode.innerHTML === "Monthly"){
            current = el.timeframes.monthly.current
            previous = el.timeframes.monthly.previous
        }
    
        weekly_hours_current[idx].innerHTML = "" + current + "hrs"
        weekly_hours_previous[idx].innerHTML = "Last week - " + previous + "hrs"
    })
}