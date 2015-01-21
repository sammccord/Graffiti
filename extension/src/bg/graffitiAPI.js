var Graffiti = function(api) {
    //Host URL for JSON rest API
    this.api = api;
}

Graffiti.prototype.Page = function() {
    var self = this;
    return {
        GET: function(args, callback) {
            console.log(self);
            //args.domain
            var domain = args.domain.replace(/\./g, '+');
            var path = args.path.replace(/\//g, '+');
            // //Convert to a param safe format to talk to api
            console.log(domain+path);
            $.ajax({
                url: self.api + '/api/pages/'+domain+path,
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    callback(err.toString())
                }
            });

        },
        POST: function POST() {

        },
        UPDATE: function UPDATE() {

        },
        DELETE: function DELETE() {

        }
    }
}

Graffiti.prototype.User = function() {
		var self = this;
    return {
        GET: function GET() {

        },
        POST: function POST() {

        },
        UPDATE: function UPDATE() {

        },
        DELETE: function DELETE() {

        }
    }
}
