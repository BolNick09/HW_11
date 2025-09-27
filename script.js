class DataLoader {
    constructor() {
        this.titleElement = document.getElementById('title');
        this.imageElement = document.getElementById('image');
        this.contentElement = document.getElementById('content');
        
        this.titleStatus = 'pending';
        this.imageStatus = 'pending';
        this.contentStatus = 'pending';
        
    }
    
 
    async loadTitle() 
    {
        try 
        {
            const response = await fetch('index.php?get=title');
            
            if (!response.ok) 
                throw new Error(`Ошибка HTTP: ${response.status}`);
            
            
            const data = await response.json();
            this.titleStatus = 'success';
            this.titleElement.innerHTML = data.title;
            this.checkAllLoaded();
        } 
        catch (error) 
        {
            console.error('Ошибка загрузки заголовка:', error);
            this.titleStatus = 'failed';
            this.titleElement.innerHTML = '<div class="error">Не удалось загрузить заголовок</div>';

        }
    }
    
 
    async loadImage() 
    {
        try 
        {
            const response = await fetch('index.php?get=image');
            
            if (!response.ok) 
                throw new Error(`Ошибка HTTP: ${response.status}`);
            
            
            const data = await response.json();
            this.imageStatus = 'success';
            
            // Создать изображение и ждать загрузки; способ через ООП
            const img = new Image();
            img.onload = () => 
            {
                this.imageElement.src = data.image;
                this.imageElement.style.display = 'block';
                
                // Убрать спиннер
                const spinner = this.imageElement.parentElement.querySelector('.spinner');
                if (spinner) 
                    spinner.style.display = 'none';
                
                this.checkAllLoaded();
            };
            
            img.onerror = () => 
            {
                throw new Error('Не удалось загрузить изображение');
            };
            
            img.src = data.image;
            
        } 
        catch (error) 
        {
            console.error('Ошибка загрузки изображения:', error);
            this.imageStatus = 'failed';
            const spinner = this.imageElement.parentElement.querySelector('.spinner');
            if (spinner) 
                spinner.innerHTML = '<div class="error">Не удалось загрузить изображение</div>';

        }
    }
    

    async loadContent() 
    {
        try 
        {
            const response = await fetch('index.php?get=content');
            
            if (!response.ok) 
                throw new Error(`Ошибка HTTP: ${response.status}`);
            
            
            const data = await response.json();
            this.contentStatus = 'success';
            this.contentElement.innerHTML = data.content;

            // Убрать спиннер
            const spinner = this.imageElement.parentElement.querySelector('.spinner');
            if (spinner) 
                spinner.style.display = 'none';

            this.checkAllLoaded();
        } 
        catch (error) 
        {
            console.error('Ошибка загрузки контента:', error);
            this.contentStatus = 'failed';
            this.contentElement.innerHTML = '<div class="error">Не удалось загрузить содержимое статьи</div>';

        }
    }
    

    checkAllLoaded() 
    {
        if (this.titleStatus === 'success' && 
            this.imageStatus === 'success' && 
            this.contentStatus === 'success') 
        {
            console.log('Все данные успешно загружены!');
        }
    }  

    loadAllData() 
    {
        this.loadTitle();
        this.loadImage();
        this.loadContent();
    }
}


document.addEventListener('DOMContentLoaded', function() 
{
    const loader = new DataLoader();
    loader.loadAllData();
});