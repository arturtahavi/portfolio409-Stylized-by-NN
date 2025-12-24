let apiKey = 'a3dc644e0e38cf6a89fc4af552f241f9'

async function checkWeather(){
    // Получаем элементы
    let resultElement = document.getElementById('resultTemp')
    let button = document.querySelector('button')
    let loading = document.getElementById('loading')
    let tempDetails = document.getElementById('tempDetails')
    let weatherIcon = document.getElementById('weatherIcon')
    
    // Начинаем загрузку
    let originalText = button.innerHTML
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...'
    button.disabled = true
    loading.style.display = 'block'
    tempDetails.style.display = 'none'
    
    try {
        let city = 'Kazan'
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric&lang=ru')
        let currentData = await response.json()

        console.log(currentData)
        
        // Основная температура
        let currentTemp = Math.round(currentData.main.temp)
        let feelsLike = Math.round(currentData.main.feels_like)
        
        // Получаем иконку погоды
        let weatherCode = currentData.weather[0].id
        let iconClass = getWeatherIcon(weatherCode)
        
        // Обновляем иконку
        weatherIcon.innerHTML = `<i class="fas ${iconClass}"></i>`
        
        // Обновляем основную температуру
        resultElement.innerHTML = `
            <strong>${currentTemp}°С</strong>
            <br><span style="color: #666; font-size: 1rem;">${currentData.weather[0].description}</span>
        `
        
        // Обновляем детали
        document.getElementById('feelsLike').textContent = `${feelsLike}°С`
        document.getElementById('humidity').textContent = `${currentData.main.humidity}%`
        document.getElementById('windSpeed').textContent = `${Math.round(currentData.wind.speed)} м/с`
        document.getElementById('pressure').textContent = `${currentData.main.pressure} гПа`
        
        // Показываем детали
        tempDetails.style.display = 'grid'
        
    } catch (error) {
        console.error('Ошибка:', error)
        resultElement.innerHTML = '⚠️ Не удалось загрузить погоду'
        resultElement.style.color = '#d32f2f'
        weatherIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>'
    } finally {
        // Завершаем загрузку
        button.innerHTML = '<i class="fas fa-sync-alt"></i> Обновить погоду'
        button.disabled = false
        loading.style.display = 'none'
    }
}

// Функция для получения иконки погоды
function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return 'fa-bolt'
    if (weatherId >= 300 && weatherId < 500) return 'fa-cloud-rain'
    if (weatherId >= 500 && weatherId < 600) return 'fa-cloud-showers-heavy'
    if (weatherId >= 600 && weatherId < 700) return 'fa-snowflake'
    if (weatherId >= 700 && weatherId < 800) return 'fa-smog'
    if (weatherId === 800) return 'fa-sun'
    if (weatherId > 800 && weatherId < 900) return 'fa-cloud'
    return 'fa-cloud-sun'
}

// Автоматическая загрузка при открытии страницы
document.addEventListener('DOMContentLoaded', function() {
    // checkWeather() // Раскомментируйте для авто-загрузки
    
    // Обработчик Enter
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            let button = document.querySelector('button')
            if (!button.disabled) {
                checkWeather()
            }
        }
    })
})