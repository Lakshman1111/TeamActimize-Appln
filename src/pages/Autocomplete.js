<TextField
                    fullWidth
                    select
                    sx={{mt:1}}
                    SelectProps={{
                      multiple: true
                    }}
                    variant='filled'
                    placeholder='Select Members'
                    name='members'
                    label="Select Members"
                    value={formik.values.members}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.members && Boolean(formik.errors.members)}
                    helperText={formik.touched.members && formik.errors.members}
                  >
                     <MenuItem value=''>Select</MenuItem>
                     {/* <MenuItem value='srinu'>srinu</MenuItem> */}
                    {members?.map((list, index) => (
                      <MenuItem value={list.id} key={list.index}>{list.name}</MenuItem>
                    ))}
                  </TextField>

                
                  <Autocomplete
                    name='members'
                    multiple={true}
                    id="tags-outlined" 
                    options={usersList} 
                    // defaultValue={editMode ? listData : null }
                    defaultValue={listData[0]}
                    getOptionLabel={(options) => options.username}
                    // value={!editMode ? userName : (userName = addProjectsData.members)}
                    // isOptionEqualToValue={(option, value) => option === value}
                    // value={!editMode? userName :list.map((name,index)=>name)}
                    value={formik.values.userName}
                    onBlur={formik.handleBlur}
                    onChange={
                      (e, value) => {
                        const member = pluck(value, 'id');
                        console.log('members', member);
                        setUserName(value);
                        formik.handleChange({ target: { name: 'members', value: member } });
                      }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Select Members"
                        placeholder="Select"
                        error={formik.touched.members && Boolean(formik.errors.members)}
                        helperText={formik.touched.members && formik.errors.members}
                      // value={!editMode ? userName:(userName=addProjectsData.members)}

                      />
                    )}
                  />