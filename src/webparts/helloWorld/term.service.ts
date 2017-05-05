import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { DataHelperSP } from './data-helpers/DataHelperSP';
import { IDataHelper } from './data-helpers/DataHelperBase';
import { DataHelpersFactory } from './data-helpers/DataHelpersFactory';

import {
    ITermStore,
    ITermSet,
    ITermGroup,
    ITerm
} from './common/SPEntities';

@Injectable()
export class TermService {

    public terms:any[];

    public domainString: string;
    private _dataHelper: IDataHelper;
    private context: any = window['context'];

    constructor() {

        var url = this.context.pageContext.web.absoluteUrl
        //"https://stebra.sharepoint.com/sites/SD1"

        var domainString = url.replace("http://", "");
        domainString = domainString.replace("https://", "");
        this.domainString = domainString.split("/").join("-");
        //domainString is needed to identify which termGroup to fetch

        console.log("term.service.ts", this);
    }

    public getTermStores(): Promise<any> {

        var termStoreId;
        this._dataHelper = DataHelpersFactory.createDataHelper(this.context);

        var promise = this._dataHelper.getTermStores()
            .then(termStoreId => this._dataHelper.getTermGroups(termStoreId[0].id))
            .then(termGroups => this.getTermGroup(termGroups))
            .then(termSets => this.getTerms(termSets))

        return promise;

    }
    public getTermGroup(termGroups: any): Promise<any> {

        var p = new Promise(function () { });

        for (let termGroup of termGroups) {
            if (termGroup.name.indexOf(this.domainString) > 0) {
                return this._dataHelper.getTermSets(termGroup)
            }
        }
        //console.log("did not find termGroup with name containing:", this.domainString);
        p.catch();
        return p;
    }
    public getTerms(termSets: any): Promise<any> {
        var p = new Promise(function () { });

        for (let termSet of termSets) {
            if (termSet.name === "Project") {
                return this._dataHelper.getTerms(termSet)
            }
        }
        //console.log("did not find termSet with name 'Project', rejecting promise");
        p.catch();
        return p;
    }
    public organizeTerms(terms: any): Array<any> {

        //console.log("terms", terms);

        var organizedTerms = [];
        var count = -1;
        for (let term of terms) {


            //console.log("term", term);
            count++;
            var props = term.CustomProperties.get_properties();

            var debug = term.labels;
            //console.log("debug", debug);


            //console.log("props", props);


            var correctTerm = props.CustomProperties;


            correctTerm.name = props.Name;
          
            correctTerm.projectColumnValue = {
                Label: term.name,
                TermGuid: term.id,
                WssId: -1
            }
            
            correctTerm.hideProject = false;



            if (correctTerm.isActive === "true") {
                organizedTerms.push(correctTerm);
            }
        }
        console.log("organizedTerms", organizedTerms);
        this.terms = organizedTerms;
        return organizedTerms;
    }
}