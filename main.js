$(document).ready(function(){

		$('#searchUser').on('keyup', function(){

			var username=$('#searchUser').val();

			

				//Make request to Github
				$.ajax({
					url:'https://api.github.com/users/'+username,
					data:{
						client_id:'67da06b5b577238d10d5',
						client_secret:'1b3811afafc08af017bb90c60964b58ca544e9a1'
					}
				}).done(function(user){

					$.ajax({
						url:'https://api.github.com/users/'+username+'/repos',
						data:{
						client_id:'67da06b5b577238d10d5',
						client_secret:'1b3811afafc08af017bb90c60964b58ca544e9a1',
						sort: 'created: asc',
						per_page: 5

                        }
					}).done(function(repos){
						$.each(repos, function(index, repo){
							$('#repos').append(` 

								<div class="well well-lg">
								 <div class="row">
								  <div class="col-md-7">
       
                                  <strong>${repo.name}</strong>: ${repo.description}

								  </div>
								   <div class="col-md-3">
		                            <span class="label label-danger">Forks: ${repo.forks_count}</span>
									<span class="label label-primary">Watchers: ${repo.watchers_count}</span>
									<span class="label label-success">Stars: ${repo.stargazers_count}</span>

								  </div>
								   <div class="col-md-2">

                            <a href="${repo.html_url}" target="_blank" class="btn btn-success btn-sm">Repo Page</a>
								  </div>
								 </div>
								</div>

								`);

						});

					

					})
					$('#profile').html(`
						<div class="panel panel-default">
						  <div class="panel-heading">
						    <h3 class="panel-title">${user.name}</h3>
						  </div>
						  <div class="panel-body">
						   <div class="row">
						     <div class="col-md-3">
						     <img src="${user.avatar_url}" class="thumbnail avatar">
<br><br>
						     <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>

						     </div>

						   <div class="col-md-9">
						   <span class="btn btn-danger btn-sm">Public Repos: ${user.public_repos}</span>
							<span class="btn btn-primary btn-sm">Public Gists: ${user.public_gists}</span>
							<span class="btn btn-success btn-sm">Followers: ${user.followers}</span>
							<span class="btn btn-info btn-sm">Following: ${user.following}</span>
							<br><br>
                           
                           <ul class="list-group">
                           <li class="list-group-item">Company: ${user.company}</li>
                           <li class="list-group-item">Website/Blog: ${user.blog}</li>
                           <li class="list-group-item">Location: ${user.location}</li>
                           <li class="list-group-item">Member since: ${user.created_at}</li>

                           </ul>

						   </div>  
						   </div>  

						  </div>
						</div>
<br><br>
						<h3 class="page-header">Latest Repos</h3>
						<div id="repos"></div>
						`);

				});
		});
});


