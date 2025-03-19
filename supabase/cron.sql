WITH updated_spaces AS (
    UPDATE spaces AS s
    SET is_active = true
    FROM spaces_activation_times AS t
    WHERE s.id = t.space_id
    AND t.start_time = TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'UTC', 'HH24:MI') 
    AND t.day_of_week = LOWER(TRIM(TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'GMT3', 'Day')))
    RETURNING s.id
)
INSERT INTO queues (space_id, start_at_time,is_active,start_at_day)
SELECT id, TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'UTC', 'HH24:MI') , true, LOWER(TRIM(TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'GMT3', 'Day')))
FROM updated_spaces;