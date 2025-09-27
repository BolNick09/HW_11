<?php

if (isset($_GET['get'])) 
{
    if ($_GET['get'] === 'title') 
    {
        
        sleep(1);// Симуляция задержки сервера
        echo json_encode(['title' => 'Динамически загруженный заголовок']);
        die();
    } 
    else if ($_GET['get'] === 'image') 
    {        
        sleep(2);
        echo json_encode(['image' => 'images/photo.png']);
        die();
    } 
    else if ($_GET['get'] === 'content') 
    {       
        sleep(1.5);
        echo json_encode(['content' => 'Этот текст был загружен динамически с сервера. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.']);
        die();
    } 
    else 
    {        
        header("HTTP/1.1 404 Not Found");
        die();
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Динамическая загрузка данных</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1 id="title">
                <div class="spinner"></div>
            </h1>
        </header>
        
        <main>
            <div class="image-container">
                <img id="image" src="" alt="Динамически загружаемое изображение">
                <div class="spinner"></div>
            </div>
            
            <article>
                <p id="content">
                    <div class="spinner"></div>
                </p>
            </article>
        </main>
        
        <!-- <footer>
            <button id="retry-btn" style="display: none;">Попробовать снова</button>
        </footer> -->
    </div>
    
    <script src="script.js"></script>
</body>
</html>