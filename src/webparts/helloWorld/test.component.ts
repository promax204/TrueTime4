import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TermService } from './term.service';
import { ListService } from './list.service';
import { WeekService } from './week.service';
import { BillingComponent } from './billing.component';
import { ProjectsService } from './projects.service';
import { UserService } from './user.service';

import { Project, Day } from './trueTimeData';

@Component({
    selector: 'test',
    styles: [`
  
a.arrow {
text-decoration: none;
}

.arrow div {

}




.hide {
    display:none;
}
.locked-hours {
    color: lightgrey;
    width: 6%;
    margin-left: 0.75%;
    border-radius: 5px;
    height: 40px;
    float: left;
    text-align: center;
    margin-top: 8px;
    border: 1px solid #ffffff;
}

.loading {
    width: 300px;
    height: 200px;
    margin-top: 20px;
    margin-left: 203px;
    background-image: url(https://d13yacurqjgara.cloudfront.net/users/69182/screenshots/2179253/animated_loading__by__amiri.gif);
    background-position: 20% 50%;
}

.other-month {
    border-color:white !important;
    background-color:white !important;
    color:lightgrey !important;
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -o-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
}
.other-month-label {
    color:grey !important;
}

.workingHoursBox {
    border-color:#bdd1ff;
    color:darkblue;
}

.today {
    background-color:#c9e0ff;
}

.locked {
    color:grey;
    border-color:grey;
}

.red{
    color: red;
    
    
}
.yellow{
    color: #ffcb00;
    
    
}
.green{
    color: green; 

    
}
#sumWeek{
       
        font-weight: bold;
        width:0%;
        height:44%;
        margin: 3.5% 0% 0% 1%;
        float:right;
        text-align:center;
}
.month-label {
    text-align: -webkit-center;
    margin-bottom: -10px;
    left: 70px;
    position: relative;
}
.boxheader{
    width: 100%;
    height:75px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border: 1px solid #cccccc;
    border-radius: 5px;
    background-color: #f2f2f2;
    color: #003399;
}
.dateBox{
    padding-left: 34%;
    width: 50%;
    height:100%;
    text-align: right;  
}
.weekDays{
    width: 13%;
    float:left;
    margin-left:1%;
}
.dayBox{
    width: 13%; 
    float:left;
    font-weight: bold;
    margin-left:1%;
}
.boxbody{
    width: 100%;
    height:75px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-bottom: 1px solid #cccccc;
    background-color: #ffffff;
    color: #000000;
}
.workingHoursBox{
    width: 6%; 
    margin-left: 0.75%;
    border: 1px solid #cccccc;
    border-radius: 5px;
    height:40px;
    float:left;
    text-align: center;
}
.projectBox{
    width: 34%;
    height:75px;
    float:left;
    margin-left:1%;
    font-weight: bold;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; 
}
.boxfooter{
    width: 100%;
    height:75px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border: 1px solid #cccccc;
    border-radius: 5px;
    background-color: #f2f2f2;
    color: #003399;
}
.deleteButton{
    width:31px;
    height:44%;
    border-radius: 5px;
    float:left;
    margin: 3.5% 0px 0px 0px;
    font-weight: bold;
}
#fontNormal{
    font-weight: normal; 
}
.sum{
    
    color: #cccccc;
    font-weight: bold;
    height:44%;
    float:left;
    text-align:center;
    margin-right: 29px;
    margin-top: 11px;
    max-width: 28px;
}
.projectButton{
    width: 107px;
    height:30px;
    border-radius: 5px;
    color: #808080;
    background-color: #f9f9f9;
    font-weight: bold;
   
}
ul, li {
    margin: 0px;
    padding: 0px;
    z-index: 10;
}
.dropdown {
    position: relative;
    display: inline-block;
    margin: 1% -88px 0 0%;
    z-index: 10;
}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    /*min-width: 90px;*/
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  	list-style-type: none;
    z-index:10;
}
.dropdown-content li {
	padding:5px;
    border-bottom:solid 1px #b3cccc;
    position:relative;
    text-align: center;
}
.dropdown:hover .dropdown-content {
    display: block;
}
.sumDeleteBox{
    width: 12%;
    height: 75px;
    float: right;
}
#addProject{
   margin: 0% 0 0 -34%; 
}
.buttonBox{
    width: 25%;
    height: 75px;
    float: left;
    margin: 2.5% 0% 0% -26%;
}
#project{
    min-width: 85px;
    margin-left: 1px;
}
.saveButton{
    width: 50px;
    height:30px;
    border-radius: 5px;
    color: #808080;
    background-color: #f9f9f9;
    font-weight: bold;
}
.reportButton{
    /*width: 85px;*/
    height:30px;
    border-radius: 5px;
    color: #808080;
    background-color: #f9f9f9;
    font-weight: bold;
}
.totalSumDay{
    color: #cccccc;
    font-weight: bold;
    float:left;
    text-align:center;
    width: 6%; 
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    height:40px;
    margin: 3.5% 0% 0% 0.75%;
  
}
.totalSum{
    color: #808080;
    font-weight: bold;
    width:0%;
    height:44%;
    margin: 3.3% 0% 0% 1%;
    float:right;
    text-align:center;
}
.arrow {
    position:absolute;
    text-align:initial;
    
    cursor:pointer;
    color:#039 !important;
}
.arrow-container {
    float:left;
    position:relative;
}

.arrow-left {

}
.arrow-right {
    bottom: -26px;
    left: 18px;
}

  `],
    template: `

    <div class="boxheader"> 



        <div class="month-label" *ngIf="weekService.month !== undefined">
            {{ weekService.monthNamesLarge[weekService.month]}}
        </div>

        <div class = "dateBox">
            <div class="arrow-container">
                <h2 
                    class="arrow arrow-left"
                    (click)="backtoWeek()"
                    [class.other-month-label]="weekService.weekBeforeLastDayMonth() !== weekService.month">
                        <
                </h2>
            </div>
            <br/>

                <div *ngIf="weekService.weeks.length > 0"> 
                    <div *ngFor="let day of weekService.week(); let i=index" 
                            [class.other-month-label]="weekService.week()[i].month !== weekService.month" class="dayBox"> 
                            {{ day.dayName }}
                    </div>
                </div>
            <br/>
                <div >
                    <div class="weekDays" *ngFor="let day of week; let i=index"
                        [class.other-month-label]="day.month !== weekService.month">
                        {{ day.dateAndMonth }}
                    </div>
                </div>
                <div class="arrow-container">
                    <h2 
                        class="arrow arrow-right"
                        (click)="gotoWeek()" 
                        [class.other-month-label]="weekService.weekNextFirstDayMonth() !== weekService.month">
                        >
                    </h2>
                </div>
        </div> 


 
                
    </div>


    <div  *ngIf="projectsService.projects?.length === 0" class="loading"></div>

    <div class="boxbody" [hidden]="project.hideProject" *ngFor="let project of projectsService.projects">
        <br/>
        <div class="projectBox"> 
            <div> {{ project.name }} </div>
            <!--<div id="fontNormal"> ({{project.type}}) </div>-->
        </div>

        <input *ngFor="let day of week; let i=index" 
            type="number" 
            [class.today]="project.week[i].isToday"
            [class.locked]="project.week[i].isLocked"
            class="workingHoursBox"
            [class.other-month]="project.week[i].month !== weekService.month"
            disabled="{{project.week[i].isLocked || project.week[i].month !== weekService.month}}"
            [(ngModel)]="project.week[i].hours" 
            (click)="removeZeroInInput($event)" 
            (blur)="onBlurHoursInput($event)" />

        <div class="sumDeleteBox">
            <div class="sum" >
             
                    {{this.getSum(project)  | number : decimalConfig() }}
            </div>

            <button (click)="deleteProject(project)" class="deleteButton" >X</button>
        </div>
    </div>

    <div class="boxfooter">

        <div class="buttonBox">
            <div class="dropdown" id="addProject">
                <button class="projectButton">+ New Row</button>

                <ul class="dropdown-content" id="project">
                    <li *ngFor="let project of projectsService.projects" 
                        (click)="selectItem(project)" 
                        [hidden]="project.hideProject === false">
                        {{ project.name }}
                    </li>
                </ul>
            </div>

            <!--<button *ngIf="projectsService.projects?.length > 0" class="saveButton" (click)="userService.save()">Save</button>-->
            <button *ngIf="projectsService.projects?.length > 0" class="reportButton" (click)="userService.lockWeek(true, true)">Lock Week</button>

        </div>
        <div *ngIf="week?.length > 0 && projectsService.projects?.length > 0">
            <div  *ngFor="let day of week; let i=index" class="totalSumDay"
               [class.red]="this.getSumDay(i) < 8"
                [class.yellow]="this.getSumDay(i) > 8"
                [class.green]="this.getSumDay(i) === 8"
            >{{this.getSumDay(i)  | number : decimalConfig() }}</div> 
        </div>
        <div 
            class="totalSum" 
            id="sumWeek"
            *ngIf="projectsService.projects?.length > 0">
                {{this.getSumTotal()  | number : decimalConfig() }} 
        </div>
    </div>
  `
})

export class TestComponent implements OnInit {

    public week: Array<any>;


    public constructor(
        @Inject(TermService) public termService: TermService,
        @Inject(ListService) public listService: ListService,
        @Inject(ProjectsService) public projectsService: ProjectsService,
        @Inject(WeekService) public weekService: WeekService,
        @Inject(UserService) public userService: UserService) {
        console.log("HELLO MY NAME IS GEORGE!");
        console.log("this.decimalConfig()", this.decimalConfig());
    }



    public isOtherMonth(day) {
        if (day.month !== this.weekService.month) { return true }
        return false;
    }

    public ngOnInit(): void { //get TERMS/USER once when component initializes.

        this.week = this.weekService.weeks[this.weekService.weekNumber];

        this.termService.getTermStores().then(termsRaw => {
            this.termService.organizeTerms(termsRaw);

            this.userService.getCurrentUser()
                .then((currentUserResponse) => {
                    if (this.userService.impersonate
                        && this.userService.user !== undefined) {
                        currentUserResponse = this.userService.user.name;
                    }
                    this.userService.userId = currentUserResponse.Id;
                    this.loadWeek();
                });
        })
    }

    public loadWeek() {
        this.hideProjects();

        //NEW WEEK WAY
        this.week = this.weekService.weeks[this.weekService.weekNumber];

        //reset projects since it has data from another week
        this.projectsService.projects = undefined;
        this.projectsService.projects = [];

        //create projects for this week
        this.loadProjectsFromTerms(this.termService.terms);

        //load hours from list into projects

        this.listService.getMyWeeklyHours(
            this.weekService.weekStart,
            this.weekService.weekEnd,
            this.userService.userId
        ).then(
            (items) => {
                console.log("FETCHED ITEMS:", items);
                if (items.value.length > 0) {
                    this.updateView(items.value);
                }
                this.showProjects();
            }
            )
    }

    public updateView(items) {

        let weekIsLocked = false;

        let projectsObj = {}
        for (let project of this.projectsService.projects) {

            projectsObj[project.projectColumnValue.TermGuid] = project; //make sure keyName is projectname
            let weekObj = {}
            for (let day of project.week) {
                weekObj[day.dateObj.format().substring(0, 15)] = day;
            }
            projectsObj[project.projectColumnValue.TermGuid].weekObj = weekObj;
        }

        for (let item of items) {
            if (item.Hours >= 1) {

                let itemDate: any = new Date(item.Date);
                let dateKey = itemDate.format().substring(0, 15);

                let day = projectsObj[item.Project.TermGuid].weekObj[dateKey];

                if (day !== undefined) {
                    day.hours = item.Hours;
                    day.isLocked = item.isLocked;
                    if (day.isLocked) { weekIsLocked = true }
                }
            }
        }

        if (weekIsLocked) {
            var saveChanges = false;
            this.userService.lockWeek(true, saveChanges);
        }


    }
    public hideProjects() { //only hide empty hours
        for (let project of this.projectsService.projects) {
            let sumHours = 0;
            for (let day of project.week) {
                sumHours += day.hours;
            }
            if (sumHours === 0) { project.hideProject = true; }
        }
    }
    public showProjects() {
        console.log("in showProjects()");
        for (let project of this.projectsService.projects) {
            let projectSumHours = 0;
            //project.hideProject = true;
            for (let day of project.week) {
                projectSumHours += day.hours;
                if (projectSumHours > 0) {
                    console.log("found some hours")
                }
            }
            console.log("(projectSumHours > 0 && projectSumHours !== undefined)", (projectSumHours > 0 && projectSumHours !== undefined));
            if (projectSumHours > 0 && projectSumHours !== undefined) {
                console.log("showing ", project.name);
                project.hideProject = false;
            }
        }

    }
    public loadProjectsFromTerms(terms: any) { //insert terms+week = projects.
        for (let term of terms) {

            //We want to copy the .week... 
            //..and so we turn everything to strings...
            term.week = JSON.parse(JSON.stringify(this.week)); //lets copy an array, meaning each term has its own copy of week, not sharing.

            //...but we dont want the .dateObj to be stringified, 
            ///...so lets put it back from the source
            var index = 0;
            for (let day of term.week) {
                day.dateObj = new Date(this.week[index].dateObj);
                index++;
            }

            var project: Project = term;
            this.projectsService.projects.push(project);
        }

    }

    public gotoWeek() {

        this.weekService.nextWeek();
        this.loadWeek();

    }

    public backtoWeek() {

        this.weekService.lastWeek();
        this.loadWeek();

    }

    public selectItem(project) {
        if (project.hideProject === true) {
            project.hideProject = false;
            var index = this.projectsService.projects.indexOf(project);
            var splicedItem = this.projectsService.projects.splice(index, 1);
            this.projectsService.projects.push(splicedItem[0]);
        }
    }

    public decimalConfig() {
        return this.userService.isAdmin ? "1.2-2" : "1.0";
        //admin shows more decimals
        //1.0 means minimum 1 digit before decimal , 0 after.
    }

    public deleteProject(project: Project) {
        project.hideProject = true;
        /*for (let day of project.week) {
            day.hours = 0;
        }*/
    }

    public getSum(project) {
        //ROW: Add upp all hours from a single project's entire week.
        var sum = 0;
        for (let day of project.week) {
            sum += day.hours


        }
        return sum;
    }
    public getSumDay(index) {
        //COLUMN : Add upp all hours from a single week's day.
        var sum = 0;
        if (this.projectsService.projects !== undefined) {
            for (let project of this.projectsService.projects) {
                if (!project.hideProject) {
                    sum += project.week[index].hours;

                }
            }
            return sum;
        }
        return 0;
    }

    public getSumTotal() {
        var sum = 0;
        for (let index in this.week) {
            sum += this.getSumDay(index);

            if (sum >= 0 && sum <= 39) {
                document.getElementById("sumWeek").className = "red";
            }
            else if (sum > 40) {
                document.getElementById("sumWeek").className = "yellow";
            }
            else if (sum == 40) {
                document.getElementById("sumWeek").className = "green";
            }
        }
        return sum;
    }

    public removeZeroInInput(event) {
        if (event.srcElement.value === "0") {
            event.srcElement.value = "";
        }
    }

    public onBlurHoursInput(event) {
        this.roundHours(event);
        this.userService.save();
    }

    public roundHours(event) {
        //replace "" with "0"
        if (event.srcElement.value === "") {
            event.srcElement.value = "0";
        }
        else {
            //round hours to max .xx decimals (two decimals)
            var num = event.srcElement.valueAsNumber;
            var roundedNum = num.toFixed(2);
            event.srcElement.valueAsNumber = roundedNum;
        }
    }


}