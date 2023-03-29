* App

  const [loggedIn,setLoggedIn] = useState(false); // need to make cookies work here somehow?

  IF NOT LOGGED IN, RENDER:
  * Navbar (Limited)
  * Login ('/')
    ---------------
    * Login Form

  IF LOGGED IN, RENDER:
  * Navbar
    needs: [loggedIn,setLoggedIn]

  * Home ('/')
    const [launches,setLaunches] = useState([])
    
    -------
    * Globe
    * Timeline
    * Upcoming Launches
      const [filters,setFilters] = useState(null)   
      * Launch Card
      * Filters
        needs: [setFilters]

  * Calendar ('/calendar')    
    -----------
    * Schedule Calendar
      * CRUD Component

  * Metrics ('/metrics') 
    -------------------
    * Display Graph (x4)   
    * Past Launches Table





