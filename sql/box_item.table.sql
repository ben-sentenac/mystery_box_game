CREATE TABLE box_items (
    id SERIAL PRIMARY KEY,
    box_id INT REFERENCES boxes(id) ON DELETE CASCADE,
    item_id INT REFERENCES items(id) ON DELETE CASCADE,
    drop_probability DECIMAL(5, 2) NOT NULL  -- e.g., 0.01 for 1% probability
);
