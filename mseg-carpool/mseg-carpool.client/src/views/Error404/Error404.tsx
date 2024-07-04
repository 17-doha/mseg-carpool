import Page from "../../components/Page";
import "./Error404.css";

function Error404() {
  return (
    <Page className="Error404">
      <h2 style={{ margin: 0 }}>
        We are sorry, the page you requested cannot be found.
      </h2>
      <p>
        The URL may be misspelled or the page you're looking for is no longer
        available.
      </p>
    </Page>
  );
}

export default Error404;
