import { Tabs, Tab, Textarea, Button, CardHeader, Card, CardBody } from "@nextui-org/react";

interface AnalysisTabProps {
    selectedDescription: string | null;
  }
  
  interface MyTabsProps {
    selectedDescription: string | null;
  }

function AnalysisTab( { selectedDescription } : AnalysisTabProps ) {
  return (
    <div>
        <Card>
        <CardBody>
            {selectedDescription}
        </CardBody>
        </Card>  
    </div>
  );
}

function CommentsTab() {
  return (
    <div>
        <Card>
        <CardBody>

        <div style={{ display: "flex", flexDirection: "column" }}>
        <Textarea
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Enter Your Comment Here..."

      />   
      </div>     
        </CardBody>
        </Card>  
    </div>
  );
}

export default function MyTabs( {selectedDescription } : MyTabsProps ) {
  return (
    <Tabs style={{marginLeft: "110px", marginTop: "30px"}}>
      <Tab key="analysis" title="Analysis">
        <AnalysisTab selectedDescription={selectedDescription} />
      </Tab>
      <Tab key="comments" title="Comments">
        <CommentsTab />
      </Tab>
    </Tabs>
  );
}
