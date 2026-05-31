import BookAppointment from "../patient/BookAppointment";

const AppointmentBookingPage = () => (
  <section className="appointment-booking-page">
    <div className="page-header" style={{ marginBottom: "var(--sp-lg)" }}>
      <h2 className="font-headline-lg text-headline-lg text-primary mb-sm">
        Book an Appointment
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
        Choose a specialist, pick a convenient time slot, and secure your consultation with our trusted care team.
      </p>
    </div>
    <BookAppointment />
  </section>
);

export default AppointmentBookingPage;
