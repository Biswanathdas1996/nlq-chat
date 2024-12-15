import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DescriptionIcon from "@mui/icons-material/Description";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface ContextDataProps {
  data: {
    results: {
      metadatas: Array<Array<{ filename: string; page_no: number }>>;
      distances: Array<Array<number>>;
      documents: Array<Array<string>>;
    };
    fine_results?: string;
    gpt_results?: string;
  };
}

const ContextData: React.FC<ContextDataProps> = ({ data }) => {
  return (
    <div>
      <div style={{ marginBottom: 10, marginTop: 10 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Document Referance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {data?.results?.metadatas[0].map((metadata, index) => (
                  <div key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <DescriptionIcon style={{ fontSize: "2.5rem" }} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={metadata.filename}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: "text.primary", display: "inline" }}
                            >
                              Page no. {metadata.page_no}
                            </Typography>
                            {` — matching distance of  ${data.results.distances[0][index]}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
              </List>
            </div>
            <div>
              <h2>Context texts</h2>
              {data.results.documents[0].map((document, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "10px",
                  }}
                >
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: "text.primary", display: "inline" }}
                  >
                    {document}
                  </Typography>
                </div>
              ))}

              {data?.fine_results && (
                <>
                  <h2>Finetune texts</h2>
                  <div
                    style={{
                      border: "1px solid black",
                      margin: "10px",
                      padding: "10px",
                    }}
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.secondary", display: "inline" }}
                    >
                      {data?.fine_results}
                    </Typography>
                  </div>
                </>
              )}
              {data?.gpt_results && (
                <>
                  <h2>Finetune texts with LLM</h2>
                  <div
                    style={{
                      border: "1px solid black",
                      margin: "10px",
                      padding: "10px",
                    }}
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.secondary", display: "inline" }}
                    >
                      {data?.gpt_results}
                    </Typography>
                  </div>
                </>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default ContextData;
