## Database Schema Design
### Users Table
Stores information about the users of the application.
### Boxes Table
Represents different types of mystery boxes available for purchase.
### Items Table
Stores information about individual items that can be found in boxes.
### Box Items Table
Represents the relationship between boxes and items, indicating which items can be found in which boxes and their drop probabilities.
### User Boxes Table
Stores the history of boxes purchased and opened by users.
### User Items Table
Represents the inventory of items owned by users.
### Leaderboards Table
Stores user rankings based on points or other criteria.
### Challenges Table
Stores information about challenges that users can complete for rewards.
### User Challenges Table
Tracks user progress and completion of challenges.


### Relationships 
- Users can own multiple boxes (via user_boxes) and collect multiple items (via user_items).
- Boxes can contain multiple items with varying probabilities (via box_items).
- Users can participate in multiple challenges and track their progress (via user_challenges).
- Leaderboards track users' rankings in different categories (e.g., global or weekly).
### Additional Considerations
Indexes:consider adding indexes to columns that will be frequently queried, like user_id in the user_items and user_boxes tables.
Constraints: Ensure data integrity by adding appropriate constraints, such as UNIQUE, NOT NULL, and foreign key constraints.
Triggers: You may want to use triggers for specific actions, such as automatically updating a user's points when they complete a challenge.