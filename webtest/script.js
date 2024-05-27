document.addEventListener("DOMContentLoaded", function() {
    const uploadForm = document.getElementById('uploadForm');
    const searchForm = document.getElementById('searchForm');

    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(uploadForm);

        try {
            const response = await fetch('/files/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert('File uploaded successfully!');
                console.log('File uploaded:', result);
                loadFiles(); // 파일 업로드 후 파일 목록 갱신
            } else {
                alert('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the file.');
        }
    });

    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const searchQuery = document.getElementById('search').value;
        
        try {
            const response = await fetch(`/files/search?filename=${searchQuery}`);
            if (response.ok) {
                const files = await response.json();
                displayFiles(files);
            } else {
                console.error('Failed to search files.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // 파일 목록 로드 함수
    async function loadFiles() {
        try {
            const response = await fetch('/files/files');
            if (response.ok) {
                const files = await response.json();
                displayFiles(files);
            } else {
                console.error('Failed to load files.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // 파일 목록 표시 함수
    function displayFiles(files) {
        const fileTableBody = document.querySelector('#fileTable tbody');
        fileTableBody.innerHTML = ''; // 테이블 비우기
        files.forEach(file => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${file.filename}</td>
                <td>${file.path}</td>
                <td>${file.mimetype}</td>
                <td>${file.size}</td>
            `;
            fileTableBody.appendChild(row);
        });
    }

    // 페이지 로드 시 파일 목록 불러오기
    loadFiles();
});
