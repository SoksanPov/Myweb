<?php
// កំណត់ផ្លូវទៅកាន់ទិន្នន័យ
$data_file = 'data/events.json';

// ពិនិត្យមើលថាតើឯកសារមានឬអត់
if (!file_exists($data_file)) {
    die("Error: ឯកសារទិន្នន័យ events.json រកមិនឃើញទេ។");
}

// អាននិងបំប្លែងទិន្នន័យ JSON
$json_data = file_get_contents($data_file);
$events = json_decode($json_data, true);

// កំណត់យកតែ ៩ Event សម្រាប់ Grid 3x3
$events_to_display = array_slice($events, 0, 9);
?>
<!DOCTYPE html>
<html lang="km">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Things To Do 📅</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>🌟 Things To Do 🌟</h1>
        <p>ស្វែងរកព្រឹត្តិការណ៍ និងសកម្មភាពគួរឱ្យចាប់អារម្មណ៍បំផុតនៅជុំវិញអ្នក។</p>
    </header>

    <main class="event-grid">
        <?php foreach ($events_to_display as $event): ?>
            <div class="event-card" data-event-id="<?php echo $event['id']; ?>">
                <img src="<?php echo $event['main_image']; ?>" alt="<?php echo htmlspecialchars($event['title']); ?>">
                <div class="card-info">
                    <h3><?php echo htmlspecialchars($event['title']); ?></h3>
                    <p><?php echo htmlspecialchars($event['short_desc']); ?></p>
                    
                    <button 
                        class="view-detail-btn" 
                        data-title="<?php echo htmlspecialchars($event['title']); ?>"
                        data-full-desc="<?php echo htmlspecialchars($event['full_desc']); ?>"
                        data-gallery-images='<?php echo json_encode($event['gallery_images']); ?>'
                    >
                        មើលលម្អិត &rarr;
                    </button>
                </div>
            </div>
        <?php endforeach; ?>
    </main>

    <div id="event-detail-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <div id="modal-body">
                <div class="carousel-container">
                    <div id="carousel-images" class="carousel-images">
                        </div>
                    <button class="prev-btn">&#10094;</button>
                    <button class="next-btn">&#10095;</button>
                </div>
                
                <h2 id="modal-title"></h2>
                <div id="modal-description"></div>
            </div>
        </div>
    </div>

    <script src="js/scripts.js"></script>
</body>
</html>