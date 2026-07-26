# App Specification

## Control

- Version: 0.1.3
- Name: WashOn Estética Automotiva

## App overview and goal

- Objective: Mobile app for detailing services shop

## Target platform

- Platform: Both iOS and Android

## Tech stack preference

- Development framework: reactive native with Expo
- Database: supabase

## Key screens / features

### Splash screen

1. Has a splash screen with the logo file attached.
2. On the splash screen has a button to Sign-up, sign-in or guest screen, and options to change language
    2.1 Default language: brazilian portuguese
    2.2 Optional Languages: English / Spanish

### Authentication

3. Has user authentication based on email or cellphone number
    3.1 Password based policy: Minimal 8 characters
        3.1.1 Must contains numbers and alphabetical characters

### User Profiles
4. User Profiles:
    4.1 Client, Specialist, Manager and Administrator
    4.2 Each user has option to change their UI language on their profile screen
        4.2.1 Defined on Sign-up screen
            4.2.1.1 Default language: Comes from Splash screen definition
        4.2.2 Languages available: Brazilian Portuguese, English and Spanish

## User flows / Profiles

### Guest profile

- Splash screen
- Guest screen
    - See list of Services with values and descriptions
		- Based on the database table "Services"
	- Link for social medias 
		- Based on the database table "Social_medias"
	- Button to "Schedule now" with a message to "Create your free account and schedule a service."
		- Go to Sign-up screen
	- Button to Back to splash screen

### Client profile

- Splash screen
- Sign-up screen
    - User registration screen
	    - login mode by email or cellphone
		    - Checkbox button to define login mode like Email or Cellphone
		- In any login mode the fields email and cellphone 1 are required fields
		- Button to add Vehicle (Vehicle registration screen)
	- Vehicle registration screen
	    - Do not allow already registered license plate
	- In background, define the user_profile like "Client"
- Sign-in screen
    - Only Vehicles registered for the logged user
	- See current vehicles with Service Orders with status scheduled, awaiting, in-service or ready
	    - See a diferent colour for each status
	- Button to see the screen for historical Service Orders (with status cancelled or delivered)
		- See a diferent colour for each status
	- See list of all Vehicles registered for this user
		- At the vehicle screen see all Service Orders for this Vehicle with option to see all details for each service order
    - Button for Schedule new Service Order for one of the vehicle registered for this user
		- At the Schedule new service order screen show the option to choose between one of this user vehicles
	- Button / Icon for Notifications on the App
		- Show all vehicle status notifications splited by status
- Sign-out
    - Back to splash screen

### Specialist profile

- Splash screen
- Sign-in screen
    - See tiles with quantity of service orders with status scheduled, awaiting, in-service or ready for current day
    - See current vehicles with Service Orders with status scheduled, awaiting, in-service or ready
	    - See a diferent colour for each status
		- Button for Check-in any vehicle with service order with status "scheduled"
		    - Checklist in screen
		    - Inside the check-in screen must have options to change the status for any service inside the service order on this vehicle from "scheduled" to "confirmed" or "cancelled"
		- Button for start a service with status "confirmed" inside a vehicle service order with status "awaiting"
		- Button for finish a service with status "in-service" inside a vehicle service order with status "in-service"
	- Button for Check-out any vehicle with service order with status "ready"
	    - Checklist out screen
	- See historical Service Orders (with status cancelled or delivered)
	- Button / Icon for Notifications on the App
- Sign-out
    - Back to splash screen

### Manager profile

- Future release

### Administrator profile

- Future release

## Data models

### Database Tables

1. Users
    - user_id - string (7 numeric characters format and sequencial automated generated)
	- username - string
	- name - string
	- surname - string
	- cellphone_1 - string
	- cellphone_2 - string
	- email - string (email format validation)
	- cpf - string (cpf format validation)
	- vehicles - array (vehicle_id from table Vehicles)
	- notification_at_start - logical (default true)
	- notification_at_end - logical (default true)
	- user_profile - string
	- user_notes - string
	- quotations - array (quotation_id from table Quotations)

2. Vehicles
    - vehicle_id - string (4 numeric characters format and sequencial automated generated)
	- make - string
	- model - string
	- license_plate - string
	- color - string
	- fuel - string
	- detailing_category - string
	- service_orders - array (service_order_id from table Services_orders)
	- vehicle_notes - string

3. Services
    - service_id - string (4 numeric characters format and sequencial automated generated)
	- service_name - string
	- service_enabled - logical (default true)
	- service_value_global_small - number
	- service_value_global_medium - number
	- service_value_global_large - number
	- service_description - string
		
4. Services_orders
    - service_order_id - string (10 numeric characters format and sequencial automated generated)
	- vehicle_id - string
	- services_status - array with 3 dimensions (service_id from table Services, service_status (string with default "scheduled") and service_value_final (number))
	- services_time - array with 3 dimensions (service_id from table Services, service_start (timestamp) and service_end (timestamp))
	- vehicle_status - string (with defaul value "scheduled")
	- service_order_start - timestamp
	- service_order_end - timestamp
	- service_order_notes - string
	- service_order_payment_status - logical (default false)
	- checklist_in_time - timestamp
	- checklist_in_photo - string
	- checklist_in_status - array with 2 dimensions (checklist_in_id from table Checklist_in and checklist_in_id_status (string with default value "none"))
	- checklist_out_time - timestamp
	- checklist_out_photo - string
	- checklist_out_status - array with 2 dimensions (checklist_out_id from table Checklist_out and checklist_out_id_status (string with default value "none"))

5. Quotations
    - quotation_id - string (10 numeric characters format and sequencial automated generated)
	- vehicle_id - string
	- user_id - string
	- services - array with 2 dimensions (service_id from table Services and service_value_order (number))
	- quotation_status - string
	- quotation_sent_time - timestamp
	- quotation_notes - string

6. Checklist_in
	- checklist_in_id - string (3 numeric characters format and sequencial automated generated)
	- checklist_in_name - string
	- checklist_in_description - string

7. Checklist_out
	- checklist_out_id - string (3 numeric characters format and sequencial automated generated)
	- checklist_out_name - string
	- checklist_out_description - string

8. Messages
    - start_message_global - string
	- end_message_global - string

9. Vehicle_status
    - vehicle_status_id - string (2 numeric characters format and sequencial automated generated)
	- vehicle_status_name - string
	- vehicle_status_description - string

10. Services_orders_status
    - services_orders_status_id - string (2 numeric characters format and sequencial automated generated)
	- services_orders_status_name - string
	- services_orders_status_description - string

11. User_profiles
    - user_profiles_id - string (2 numeric characters format and sequencial automated generated)
	- user_profiles_name - string
	- user_profiles_description - string

12. Social_medias
    - social_medias_id - string (3 numeric characters format and sequencial automated generated)
	- social_medias_name - string
	- social_medias_enabled - logical (default true)
	- social_medias_description - string

## External APIs or integrations

- WhatsApp: API to Send customer notification
- Email: Send customer notification

## Non-functional requirements

- Encripted SSL protocol for all connections

## Essential app functions

### Statistics

- For each Vehicle status change, create cumulative statistics throughout the DAY (00:00:00h to 23:59:59h), based on "Vehicle Status" for the following metrics:
	- Total Vehicles Scheduled
	- Total Vehicles Cancelled
	- Total Vehicles on the lot = Vehicles Awaiting + In Service + Ready
	- Total Vehicles Awaiting
	- Total Vehicles In Service
	- Total Vehicles Ready
	- Total Vehicles Delivered
- Create consolidated statistics by Day, Week, Month, Year, based on the cumulative metrics at the end of each day.

### Status Flow and Processing of Vehicles and Service Orders

- Scheduled
	- Note 1: Enter this phase after initial contact with the client and prior explanation about the services, deadlines, and costs.
	- Note 2: In this phase, a "Service Order" will be created for each vehicle to be serviced.
	- Confirm/Register Client Data
	- Confirm/Register Vehicle Data
	    - More than one vehicle can be registered per client.
	- Confirm Services requested by the Client
	    - NOTE: This step must be performed for each vehicle separately.
	- Confirms individual and total service values
	- Calculates and confirms the estimated execution time for all services
	- Confirms the customer's request for each service
	- Changes the service status to "Scheduled"
	- Creates the Vehicle's "Service Order"
	    - Adds each confirmed service to the Vehicle's "Service Order"
	- Confirms the estimated date and time of the Vehicle's arrival on the lot
	- Confirms the estimated date and time of the Vehicle's "Delivery" (exit from the lot)
	- Changes the Vehicle's status to "Scheduled"
	    - NOTE: If it is necessary to cancel the service after the registration and confirmation above, i.e., after "Scheduled", follow the cancellation process defined in the "Awaiting" status to cancel All Services and add some detail about the reason in the "Notes" field of the "Service Order"
- Awaiting
	- Requirements:
		- Confirm Vehicle Data
		- Operational Check-in (App / Browser)
		- Confirm Requested Services
		- Mark the service as “Confirmed” or “Cancelled”, as needed.
		- Change the service status to “Confirmed” or “Cancelled” according to the option selected by the specialist
		- Change the Vehicle status to “Awaiting”, if there is at least 1 service with “Confirmed” status
		- Mark the date and time of the Vehicle's entry into the lot, if the Vehicle status is changed to “Awaiting”
		- Change the Vehicle status to “Cancelled”, if there is not at least 1 service with “Confirmed” status
		- Mark the date and time of the Vehicle's departure from the lot, if the Vehicle status is changed to “Cancelled”
- In Service
	- Note: There may be more than 1 service per Vehicle
	- Note: This step can only be executed if there is at least 1 service with "Confirmed" status in the Vehicle's "Service Order".
	- Requirements:
		- Service Selection
		- Specialist Selection (future release)
		- Service Start Confirmation by the Specialist
		- Changes service status to "Started"
		- Sets the date and time for the service start
		- Sends a "Service Start" message to the Client (future release)
			- WhatsApp and/or SMS
			- Email?
		- Basic template
			- Possibility to customize the general template by the Manager or Administrator user
		- Changes Vehicle status to "In Service"
- Ready
	- Note: There may be more than 1 service per vehicle
	- Requirements - Service:
		- Operational Check-out (App / Browser)
			- Option to enable Secondary Check-out (configured only by Manager or Administrator) (future release)
		- Confirmation of Service Completion by the Specialist
			- Option to enable Secondary Confirmation (configured only by Manager or Administrator) (future release)
		- Changes service status to "Completed"
		- Sets the date and time of service completion
	- Requirements - Vehicle:
		- If all "scheduled" services have a "Completed" status
		- Changes the Vehicle status For “Ready”
		- Sets the date and time the vehicle is “Ready”
		- Send a “Vehicle Readiness” message to the customer (future release)
			- WhatsApp and/or SMS
			- Email?
		- Basic template
			- Possibility to customize the general template by the Manager or Administrator user
- Delivered
	- Requirements:
		- Vehicle must have "Ready" status
		- Customer Check-out (future release)
		- Customer Delivery Confirmation (App / Browser)
		- Payment Confirmation
		- Change Vehicle Status to "Delivered"
		- Set date and time for Vehicle "Delivery" (leaving the lot)
		- Send or request satisfaction survey (future release)

## Initial data for database tables

- Table: Checklist_in
	- Fields
		- checklist_in_name = "dents"
		- checklist_in_name = "scratches"
		- checklist_in_name = "vires"
		- checklist_in_name = "defective parts"

- Table: Checklist_out
	- Fields
		- checklist_out_name = "flawless paintwork"
		- checklist_out_name = "clean wheels"
		- checklist_out_name = "conditioned tires"
		- checklist_out_name = "clean and conditioned plastics"
		- checklist_out_name = "clean windows"
		- checklist_out_name = "clean door_edges"
		- checklist_out_name = "clean streakfree windows"
		- checklist_out_name = "perfect vacuuming"
		- checklist_out_name = "clean conditioned dashboard plastics"

- Table: Services
	- Fields
		- services_name = "Basic Wash"
		- services_name = "Premium Wash"
		- services_name = "Polishing"
		- services_name = "Interior Cleaning"
		- services_name = "Crystal Coating"
		- services_name = "Vitrification"
		- services_name = "Window Film"

- Table: Vehicle_status
    - Fields
		- vehicle_status_name = "Scheduled"
		- vehicle_status_name = "Cancelled"
		- vehicle_status_name = "Awaiting"
		- vehicle_status_name = "In-Service"
		- vehicle_status_name = "Ready"
		- vehicle_status_name = "Delivered"

- Table: Services_orders_status
    - Fields
		- services_orders_status_name = "Scheduled"
		- services_orders_status_name = "Confirmed"
		- services_orders_status_name = "Cancelled"
		- services_orders_status_name = "Started"
		- services_orders_status_name = "Finished"

- Table: User_profiles
	- Fields
		- user_profiles_name = "Guest"
		- user_profiles_name = "Client"
		- user_profiles_name = "Specialist"
		- user_profiles_name = "Manager"
		- user_profiles_name = "Administrator"

- Table: Social_medias
    - Fields:
		- social_medias_name - "https://www.instagram.com/washonestetica"
		- social_medias_name - "https://www.facebook.com/p/Wash-on-est%C3%A9tica-automotiva-61555475860948/"
		

