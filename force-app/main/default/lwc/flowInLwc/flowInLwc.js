import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
const timeout = 10;
export default class FlowInLwc extends LightningElement {
    flowApiName = "Create_Lead_Flow";
    showFlow = true;

    // Setting flow input variables,
    // hard coded only for demo purpose
    get flowInputVariables() {
        if (this.flowApiName === "Create_Lead_Flow") {
            return [
                {
                    name: "companyName",
                    type: "String",
                    value: "Burlington Textiles Corp of America"
                }
            ];
        }

        // Create_Contact_Flow
        return [
            {
                name: "accountId",
                type: "String",
                value: "001B000001QzX1wIAF"
            }
        ];
    }

    options = [
        { label: "Create Contact", value: "Create_Contact_Flow" },
        { label: "Create Lead", value: "Create_Lead_Flow" }
    ];

    handleChangeFlow(event) {
        clearTimeout(this.timer);
        this.showFlow = false;
        this.flowApiName = event.target.value;

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.timer = setTimeout(() => {
            this.showFlow = true;
        }, timeout);
    }

    handleFlowStatusChange(event) {
        console.log("flow status", event.detail.status);
        if (event.detail.status === "FINISHED") {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Success",
                    message: "Flow Finished Successfully",
                    variant: "success"
                })
            );
        }
    }
}
