# Quickstart: Romance Mechanics & Gameplay Expansion

## Development Setup

To test phone calls and affinity meters locally:

1. **Verify Backend Status**:
   Ensure the NestJS backend is running on `http://localhost:4000`. You can inspect the logs at:
   `C:\Users\Kamila Faria\.gemini\antigravity-ide\brain\32823f48-f9a2-4282-a375-8ff9a571691d\.system_generated\tasks\task-15.log`

2. **Verify Frontend Status**:
   Ensure Next.js is running on `http://localhost:3000`.

3. **Database Seed**:
   Run the database seed commands (if any exist) or call the register/login endpoints to verify affinity data is initialized.

4. **Triggering Phone Calls**:
   - Access the phone icon in the game HUD.
   - Click a contact to initiate a call.
   - To trigger an incoming date call, adjust user affinity via development helper tools or in-database:
     ```sql
     UPDATE character_affinities SET affinity_score = 55 WHERE character_id = 'castiel';
     ```
     Then load the main school hallway scenario to receive the call.
