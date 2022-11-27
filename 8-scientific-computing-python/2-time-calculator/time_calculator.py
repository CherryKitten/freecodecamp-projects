def add_time(start, duration, day="none"):
    # Split the input variables into useful numbers
    start = start.split(":")
    duration = duration.split(":")
    start_hrs = int(start[0])
    start_mins = int(start[1].split(" ")[0])
    start_am_pm = start[1].split(" ")[1]
    duration_hrs = int(duration[0])
    duration_mins = int(duration[1])

    if start_am_pm.lower() == "pm": start_hrs = start_hrs + 12 # Convert to 24 hour format because that makes more sense

    new_hrs = start_hrs + duration_hrs
    new_mins = start_mins + duration_mins
    dayslater = 0

    # make sure minutes are under 60 and hours get adjusted for every 60 extra minutes
    while new_mins > 59:
        new_mins = new_mins - 60
        new_hrs = new_hrs + 1

    # make sure hours are under 24 and days get adjusted for every 24 extra hours
    while new_hrs > 23:
        new_hrs = new_hrs - 24
        dayslater = dayslater + 1

    # Convert back to 12 hour format
    if new_hrs > 12:
        new_hrs = new_hrs - 12
        new_am_pm = "PM"
    elif new_hrs == 12:
        new_am_pm = "PM"
    else:
        new_am_pm = "AM"

    if new_hrs == 0 and new_am_pm == "AM": new_hrs = 12 # Adjust for americans being really weird, why the hell is it 12AM and not 0???

    newtime = str(new_hrs) + ":" + str(new_mins).zfill(2) + " " + new_am_pm # Build new timestring

    if day != "none":
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        day = day.lower().title()
        index = days.index(day)
        new_index = (index + dayslater) % len(days) # wrap around the list to find new day
        newtime = newtime + ", " + days[new_index] # add day to timestring

    # add number of days to timestring
    if dayslater == 1:
        newtime = newtime + " (next day)"
    elif dayslater > 1:
        newtime = newtime + " (" + str(dayslater) + " days later)"

    return newtime # done!