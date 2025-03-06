const FAQ = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">
            Question 1: What is this service about?
          </h2>
          <p>
            This service is a document management microservice that allows users
            to upload, retrieve, and delete documents.
          </p>
        </div>
        <div>
          <h2 className="font-semibold">
            Question 2: How do I upload a document?
          </h2>
          <p>
            You can upload a document by navigating to the upload section in the
            dashboard and selecting a file from your device.
          </p>
        </div>
        <div>
          <h2 className="font-semibold">
            Question 3: What file types are supported?
          </h2>
          <p>
            This service supports various file types including documents,
            images, spreadsheets, and presentations.
          </p>
        </div>
        <div>
          <h2 className="font-semibold">
            Question 4: How can I contact support?
          </h2>
          <p>
            You can reach out to our support team through the contact page
            available in the navigation bar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
