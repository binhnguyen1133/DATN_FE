import React from 'react';
import $ from 'jquery';
import './create-cv.scoped.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOMServer from 'react-dom/server';

export class CreateCV extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
            address: '',
            phone: '',
            email: '',
            skill: '',
            tech: '',
            website: '',
            github: '',
            name: '',
            applyFor: '',
            summary: '',
            experience: '',
            education: '',
            isSaved: false,
            totalSkills: 1,
            totalTechnologies: 1,
            totalExperience: 1
        }
        this.addInputSkill = this.addInputSkill.bind(this);
        this.removeInputSkill = this.removeInputSkill.bind(this);
        this.addInputTech = this.addInputTech.bind(this);
        this.removeInputTech = this.removeInputTech.bind(this);
        this.addExperience = this.addExperience.bind(this);
        this.removeExperience = this.removeExperience.bind(this);
        this.downloadCv = this.downloadCv.bind(this);
	}

    addInputSkill() {
        var new_skill = this.state.totalSkills + 1;
        this.setState({totalSkills: new_skill}, () => {
            console.log(this.state.totalSkills);
            var new_input = `<li style='margin: 6px 6px 0 0' className='newInputSkill' id='newInputSkill${new_skill}'><input type='text' placeholder='Kĩ năng'></li>`;
        $('#skills').append(new_input);
        });
    } 

    removeInputSkill() {
        var last_skill = this.state.totalSkills;
        if(last_skill>1){
            $('#newInputSkill'+last_skill).remove();
            this.setState({totalSkills: last_skill - 1});
        }
    } 

    addInputTech() {
        var new_tech = this.state.totalTechnologies + 1;
        this.setState({totalTechnologies: new_tech}, () => {
            console.log(this.state.totalTechnologies);
            var new_input = "<li style='margin: 6px 6px 0 0' className='newInputTech' id='newInputTech"+new_tech+"'><input type='text' placeholder='Công nghệ'></li>";
        $('#technologies').append(new_input);
        });
    } 

    removeInputTech() {
        var last_tech = this.state.totalTechnologies;
        if(last_tech>1){
            $('#newInputTech'+last_tech).remove();
            this.setState({totalTechnologies: last_tech - 1});
        }
    } 

    addExperience() {
        var new_exp = this.state.totalExperience + 1;
        this.setState({totalExperience: new_exp}, () => {
            console.log(this.state.totalExperience);
            var new_input = "<li id='newExperience"+new_exp+"'><textarea id='w3review' name='w3review' rows='4' cols='80' placeholder='Mô tả công việc'></textarea></li>";
        $('#experience').append(new_input);
        });
    }

    removeExperience() {
        var last_exp = this.state.totalExperience;
        if(last_exp>1){
            $('#newExperience'+last_exp).remove();
            this.setState({totalExperience: last_exp - 1});
        }
    }

    downloadCv(){
        $('.button-add-remove').css("display","none")
        this.setState({isSaved: true});
        setTimeout(() => {
            const printArea = document.getElementById("cv");
        html2canvas(printArea,{}).then(canvas => {
            const dataURL = canvas.toDataURL();
            const pdf = new jsPDF("p", "mm", "a4");
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();     
            pdf.addImage(dataURL, 'JPEG', 50, 50, 170, 200);
            pdf.save('cv.pdf')
        })
        }, 500);
        
    }

render() {
    return (
        <div>
            <div style={{textAlign: 'right'}}>
            <button onClick={this.downloadCv} type="button" class="btn btn-success">Lưu và xuất CV</button>
            </div>
        <form >
            
        <section id="save">
        <section class="sheet" id="cv">
            <aside style={{width: "30%"}}>
                <section class="contact">
                    <h6>Contact</h6>
                    <ul>
                        <li>
                        {this.state.isSaved
                                ? <p><i class="fa fa-map-marker-alt" title="Location"></i>{this.state.address}</p>
                                :<div><span><i class="fa fa-map-marker-alt" title="Location"></i></span><input type="text" name="address" id="address" placeholder="Địa chỉ"
                            onChange={(event) => this.setState({address: event.target.value})}>
                            </input></div>
                            }
                        </li>
                        <li>
                        {this.state.isSaved
                            ?<span><i class="fa fa-phone" title="Cell phone"></i>{this.state.phone}</span>
                            :<div>
                            <span><i class="fa fa-phone" title="Cell phone"></i></span>
                            <input type="text" name="phone" id="phone" placeholder="SĐT"
                            onChange={(event) => this.setState({phone: event.target.value})}></input>
                            </div>
                        }
                        </li>
                        <li>
                            <span></span>
                            {this.state.isSaved
                            ?<span><i class="fa fa-envelope" title="Email"></i>{this.state.email}</span>
                            :<div>
                            <span><i class="fa fa-envelope" title="Email"></i></span>
                            <input type="text" name="email" id="email" placeholder="Email"
                            onChange={(event) => this.setState({email: event.target.value})}></input>
                            </div>
                        }
                        </li>
                        <li>
                            {this.state.isSaved
                            ?<span><i class="fa fa-globe-americas" title="Website"></i>{this.state.website}</span>
                            :<div>
                            <span><i class="fa fa-globe-americas" title="Website"></i></span>
                            <input type="text" name="web" id="web" placeholder="Website"
                            onChange={(event) => this.setState({website: event.target.value})}></input>
                            </div>
                            }
                        </li>
                        <li>
                            {this.state.isSaved
                            ?<span><i class="fa fa-github" title="Github"></i>{this.state.github}</span>
                            :<div>
                            <span><i class="fa fa-github" title="Github"></i></span>
                            <input type="text" name="web" id="web" placeholder="Website"
                            onChange={(event) => this.setState({github: event.target.value})}></input>
                            </div>
                            }
                        </li>
                    </ul>
                </section>
                        <section class="skills">
                            <h6>Skills</h6>
                            <ul id="skills">
                            </ul>
                            <li style={{margin: "6px 6px 0 0"}} className='newInputSkill' id='newInputSkill'>

                            {this.state.isSaved
                                                ? <span>{this.state.skill}</span>
                                                : <input type="text" placeholder="Kĩ năng"
                                                    onChange={(event) => this.setState({ skill: event.target.value })}></input>
                                            }
                            </li>
                            <ul class="button-add-remove">
                                <li onClick={this.addInputSkill}><span>+</span></li>
                                <li onClick={this.removeInputSkill}><span>-</span></li>
                            </ul>
                        </section>
                <section class="skills">
                    <h6>Technologies</h6>
                    <ul id ="technologies">
                        
                    </ul>
                    <li style={{margin: "6px 6px 0 0"}} className='newInputTech' id='newInputTech'>
                        {this.state.isSaved
                                                ? <span>{this.state.tech}</span>
                                                : <input type="text" placeholder="Công nghệ"
                                                    onChange={(event) => this.setState({ tech: event.target.value })}></input>
                                            }
                        </li>
                            <ul class="button-add-remove">
                                <li onClick={this.addInputTech}><span>+</span></li>
                                <li onClick={this.removeInputTech}><span>-</span></li>
                            </ul>
                </section>
                <section class="references">
                    <h6>References</h6>
                    <address>
                        Jane Doe<br />
                        Alphabet Inc.<br />
                        (413) 025-1900
                        jane@janedoe.site
                    </address>
                    <address>
                        Luke O'Connor<br />
                        Facebook<br />
                        (413) 125-1400
                        luke@facebook.site
                    </address>
                    <p>Typeset in HTML &amp; CSS<br />
                    See <a href="https://git.io/f4dXp">git.io/f4dXp</a></p>
                </section>
            </aside>
            <section style={{width: "70%"}}>
                        <header class="name" aria-label="Joe Smith">
                            <label>
                                {this.state.isSaved
                                ?<h3>{this.state.name}</h3>
                                :<div><input type="text" name="username" id="username" placeholder="Tên"
                                onChange={(event) => this.setState({name: event.target.value})}></input></div>
                                }
                            </label>
                            <h6>
                                {this.state.isSaved
                                ? <h6>{this.state.applyFor}</h6>
                            :<input type="text" name="position" id="position" placeholder="Vị trí ứng tuyển"
                            onChange={(event) => this.setState({applyFor: event.target.value})}></input>
                        }
                            </h6>
                            <hr />
                        </header>
                <section>
                    <section class="summary">
                        <h6>Summary</h6>
                        {this.state.isSaved
                            ? <p>{this.state.summary}</p>
                            :<textarea id="w3review" name="w3review" rows="4" cols="70" placeholder="Giới thiệu"
                            onChange={(event) => this.setState({summary: event.target.value})}></textarea>
                        }
                    </section>
                    <section class="experience">
                        <h6>Experience</h6>
                                    <ol id='experience'>
                                        <li id="newExperience">
                                            {this.state.isSaved
                                                ? <p>{this.state.experience}</p>
                                                : <textarea id="w3review" name="w3review" rows="4" cols="70" placeholder="Mô tả công việc"
                                                    onChange={(event) => this.setState({ experience: event.target.value })}></textarea>
                                            }
                                        </li>
                                    </ol>
                                <ul class="button-add-remove">
                                    <li onClick={this.addExperience}><span>+</span></li>
                                    <li onClick={this.removeExperience}><span>-</span></li>
                                </ul>
                    </section>
                    <section class="education">
                        <h6>Education</h6>
                        <ol>
                            <li>
                            {this.state.isSaved
                            ? <p>{this.state.education}</p>
                            :<textarea id="w3review" name="w3review" rows="4" cols="80" placeholder="Mô tả"
                            onChange={(event) => this.setState({education: event.target.value})}></textarea>
                        }
                            </li>
                            
                        </ol>
                    </section>
                </section>
            </section>
        </section>
    </section>
    </form>
    <input type="hidden" value="1" id="total_skills"></input>
    <input type="hidden" value="1" id="total_technologies"></input>
    <input type="hidden" value="1" id="total_experience"></input>
    </div>
    )
}
}