const checkboxHTML = document.querySelector('#checkbox-html');
const checkboxCSS = document.querySelector('#checkbox-css');
const checkboxJS = document.querySelector('#checkbox-js');
const skillsWrapper = document.querySelector('#skills-wrapper');
const socialNetwork = document.querySelector('#input-social-network');
const link = document.querySelector('#input-link');
const socNetForm = document.querySelector('#soc-net-form');
const submit = document.querySelector('#submit');
const linksWrapper = document.querySelector('#links-wrapper');
const skillTextArea = document.querySelector('#skill-textarea');
const addSkillButton = document.querySelector('#add-skill');

let linksArray = [];

document.addEventListener('DOMContentLoaded', function()
{ 
    loadSkillsFromStorage();
    loadLinksFromStorage();
    displayLinks();

});

checkboxHTML.addEventListener('change',() => updateSkill(checkboxHTML));
checkboxCSS.addEventListener('change',() => updateSkill(checkboxCSS));
checkboxJS.addEventListener('change', () => updateSkill(checkboxJS));


function updateSkill(checkbox) {
    if(checkbox.checked) {
        addSkill(checkbox.name, checkbox.id);
    } else {
        removeSkill(checkbox.id);
    }
    saveSkillsToStorage();
}

function addSkill(name, id) {
    skillsWrapper.innerHTML += `
        <p id="skill-${id}" class="border-1 pl-2 pr-2 pt-1 pb-1 rounded-md w-fit h-auto">
            ${name}
        </p>
    `;
}

function removeSkill(checkboxId) {
    const skillElement = document.getElementById(`skill-${checkboxId}`);
    if (skillElement) {
        skillElement.remove();
    }
}

function saveSkillsToStorage() {
    const skills = [];
    
    if (checkboxHTML.checked) skills.push(checkboxHTML.name);
    if (checkboxCSS.checked) skills.push(checkboxCSS.name);
    if (checkboxJS.checked) skills.push(checkboxJS.name);
    
    localStorage.setItem('selectedSkills', JSON.stringify(skills));
}

// function renderSkills(skills) {
//     skills.forEach
// }

function loadSkillsFromStorage() {
    const savedSkills = JSON.parse(localStorage.getItem('selectedSkills')) || [];
    
    // Восстанавливаем чекбоксы
    if (savedSkills.includes(checkboxHTML.name)) {
        checkboxHTML.checked = true;
        addSkill(checkboxHTML.name, checkboxHTML.id);
    }
    if (savedSkills.includes(checkboxCSS.name)) {
        checkboxCSS.checked = true;
        addSkill(checkboxCSS.name, checkboxCSS.id);
    }
    if (savedSkills.includes(checkboxJS.name)) {
        checkboxJS.checked = true;
        addSkill(checkboxJS.name, checkboxJS.id);
    }

    // renderSkills();
}

// Добавляем обработчик на кнопку
addSkillButton.addEventListener('click', addCustomSkill);

// Обработчик Enter в textarea
skillTextArea.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addCustomSkill();
    }
});

function addCustomSkill() {
    const skillText = skillTextArea.value.trim();
    
    // Проверяем, что текст не пустой
    if (!skillText) {
        alert('Пожалуйста, введите навык');
        return;
    }
    
    
    // Добавляем навык
    addSkill(skillText);
    
    // Очищаем textarea
    skillTextArea.value = '';
    
    // Сохраняем в LocalStorage
    saveSkillsToStorage();
}

function addSkill(name, id) {
    const skillsWrapper = document.getElementById('skills-wrapper');
    
    // Удаляем плейсхолдер если он есть
    const placeholder = skillsWrapper.querySelector('.text-gray-400');
    if (placeholder) {
        placeholder.remove();
    }
    
    skillsWrapper.innerHTML += `
        <p id="skill-${id}" class="border-1 pl-2 pr-2 pt-1 pb-1 rounded-md w-fit h-auto">
            ${name}
        </p>
    `;
}


// Загрузка данных из Local Storage
function loadLinksFromStorage() {
    const savedLinks = localStorage.getItem('socialLinks');
    if (savedLinks) {
        linksArray = JSON.parse(savedLinks);
        console.log('Ссылки загружены из хранилища:', linksArray);
    }
}

// Сохранение данных в Local Storage
function saveLinksToStorage() {
    localStorage.setItem('socialLinks', JSON.stringify(linksArray));
    console.log('Ссылки сохранены в хранилище');
}


socNetForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formDataObj = new FormData(e.target);
    const socialNetwork = formDataObj.get('social-network');
    const link = formDataObj.get('link').trim();

    // Проверка на пустые поля
    if (!socialNetwork || !link) {
        alert('Пожалуйста, заполните оба поля');
        return;
    }

    addLink(socialNetwork, link);
    
    // Очистка формы после добавления
    e.target.reset();
})

function addLink(socialNetwork, link) {
    // Добавляем в массив
    linksArray.push({
        name: socialNetwork,
        link: link
    });
    
    // Сохраняем в Local Storage
    saveLinksToStorage();
    
    // Обновляем отображение
    displayLinks();
}

// Функция отображения всех ссылок
function displayLinks() {
    // Очищаем контейнер
    linksWrapper.innerHTML = '';
    
    // Добавляем все ссылки из массива
    linksArray.forEach(item => {
        linksWrapper.innerHTML += `<a href="${item.link}" target="_blank" class="text-blue-700 m-2 inline-block">${item.name}</a>`;
    });
    
    // Если массив пустой, показываем заглушку
    if (linksArray.length === 0) {
        linksWrapper.innerHTML = '<p class="text-gray-500">Нет добавленных ссылок</p>';
    }
}

